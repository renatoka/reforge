Deciding which workspace information to collect

Collecting workspace information

Filtering to most relevant information

# Reforge

Reforge is a boilerplate project that combines Vite, React, TypeScript, TailwindCSS, Electron Forge, Prisma, and SQLite to provide a robust starting point for building Electron applications.

## Project Structure

The project is structured as follows:

- `src/`: This is where the source code of the application resides.
- `app.tsx`: This is the main React component of the application.
- `backend/`: This directory contains the backend code.
- `frontend/`: This directory contains the frontend code.
- `main.ts`: This is the entry point for the Electron main process.
- `preload.ts`: This script is loaded before the renderer process is loaded.
- `prisma.ts`: This file sets up the Prisma client for database operations.
- `renderer.ts`: This is the entry point for the Electron renderer process.
- `prisma/`: This directory contains the Prisma schema and migrations.

## Getting Started

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm run start`.

## Building the Project

To build the project, run `npm run make`. This will create a distributable package of the application.

## Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting. You can run the linter by executing `npm run lint` and format the code by running `npm run pretty`.

## Testing

The project is currently not set up with a testing framework. You can add your preferred testing framework like Jest or Mocha.

## Contributing

Contributions are welcome. Please make sure to run the linter and formatter before committing your changes.

## License

The project is licensed under the MIT license.

Please note that this is a basic guide and you might need to adjust it according to your project's specific needs.
