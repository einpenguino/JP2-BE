-- CreateTable
CREATE TABLE "Airtemp" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "station_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Airtemp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Humidity" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "station_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Humidity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winddir" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "station_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Winddir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Windspeed" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "station_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Windspeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airtemp_timestamp_station_id_key" ON "Airtemp"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Humidity_timestamp_station_id_key" ON "Humidity"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Winddir_timestamp_station_id_key" ON "Winddir"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Windspeed_timestamp_station_id_key" ON "Windspeed"("timestamp", "station_id");
