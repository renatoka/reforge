import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import path from 'path';
import { open } from 'sqlite';
import ChannelRegister from './backend/ChannelRegister';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3').verbose();

// Please read DATABASE.md for more information on this implementation
const HOME_PATH = app.getPath('home');
const DATABASE_PATH = path.join(HOME_PATH, 'database.db');
const ROOT_DATABASE_PATH = path.join(__dirname, '../../database.db');

const runDatabaseMigrations = async () => {
  const db = await open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(
    `CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      migration_name TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  );

  const migrations = await db.all('SELECT migration_name FROM _prisma_migrations;');

  const migrationFolders = fs.readdirSync(path.join(__dirname, '../../prisma/migrations'));

  for (const migration of migrations) {
    if (!migrationFolders.includes(migration.migration_name)) {
      await db.exec(
        `DELETE FROM _prisma_migrations WHERE migration_name='${migration.migration_name}';`,
      );
    }
  }

  for (const migrationFolder of migrationFolders) {
    if (migrationFolder === 'migration_lock.toml' || migrationFolder === '.DS_Store') {
      continue;
    }

    if (migrations.some(m => m.migration_name === migrationFolder)) {
      continue;
    }

    const files = fs.readdirSync(
      path.join(__dirname, `../../prisma/migrations/${migrationFolder}`),
    );

    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(__dirname, `../../prisma/migrations/${migrationFolder}/${file}`),
        'utf-8',
      );

      await db.exec(sql);
      await db.run(
        `INSERT INTO _prisma_migrations (migration_name) VALUES ('${migrationFolder}');`,
      );
    }
  }
};

const setupProductionDatabase = async () => {
  if (!fs.existsSync(DATABASE_PATH)) {
    fs.copyFileSync(ROOT_DATABASE_PATH, DATABASE_PATH);
    process.env.DATABASE_URL = `file:${DATABASE_PATH}`;
  } else {
    process.env.DATABASE_URL = `file:${DATABASE_PATH}`;
  }
  await runDatabaseMigrations();
};

if (require('electron-squirrel-startup')) {
  app.quit();
}

if (app.isPackaged) {
  setupProductionDatabase();
}

const createWindow = async () => {
  // Create the browser window.
  ipcMain.handle('api:request', async (event, params) => {
    return await handlerequests(params);
  });
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Read on why this is disabled here: https://stackoverflow.com/a/57507392
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
async function handlerequests(params: { channel: string; data: any }) {
  return await ChannelRegister.call({ name: params.channel }, params.data);
}
