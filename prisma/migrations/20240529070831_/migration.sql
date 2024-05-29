-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

INSERT INTO "User" ("id", "email", "name", "password") VALUES ('ckq1z5z5z0000a3jv5z5z0000', 'alice@example.com', 'Alice', '$2b$10$1v7');
INSERT INTO "User" ("id", "email", "name", "password") VALUES ('ckq1z5z5z0000a3jv5z5z0001', 'rob@example.com', 'Rob', '$2b$10$1v8');

INSERT INTO "Post" ("id", "title", "content", "published", "authorId") VALUES ('ckq1z5z5z0000a3jv5z5z0002', 'Hello World', 'This is a post.', true, 'ckq1z5z5z0000a3jv5z5z0000');
INSERT INTO "Post" ("id", "title", "content", "published", "authorId") VALUES ('ckq1z5z5z0000a3jv5z5z0003', 'Hello Prisma', 'This is another post.', false, 'ckq1z5z5z0000a3jv5z5z0001');