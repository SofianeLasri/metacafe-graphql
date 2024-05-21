-- CreateTable
CREATE TABLE "CenterOfInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "centerOfInterestId" INTEGER NOT NULL,
    CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserInterest_centerOfInterestId_fkey" FOREIGN KEY ("centerOfInterestId") REFERENCES "CenterOfInterest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInterest_userId_centerOfInterestId_key" ON "UserInterest"("userId", "centerOfInterestId");
