-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT,
    "First" TEXT,
    "Last" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
