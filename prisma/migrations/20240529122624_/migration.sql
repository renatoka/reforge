-- CreateTable
CREATE TABLE "Example" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "body" TEXT
);

INSERT INTO "Example" ("id", "title", "body") VALUES (1, 'Hello', 'World');