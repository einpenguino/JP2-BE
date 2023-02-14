-- CreateTable
CREATE TABLE "Stations" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reading_type" TEXT NOT NULL,
    "reading_unit" TEXT NOT NULL,

    CONSTRAINT "Stations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stations_device_id_reading_type_key" ON "Stations"("device_id", "reading_type");
