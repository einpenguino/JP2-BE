-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Places" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alias" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "places_fk" INTEGER NOT NULL,
    "user_fk" INTEGER NOT NULL,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "start_id" INTEGER NOT NULL,
    "end_id" INTEGER NOT NULL,
    "user_fk" INTEGER NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "routes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "isAdmin" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Rainfall" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "station_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rainfall_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_PlacesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Places_address_latitude_longitude_key" ON "Places"("address", "latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Alias_alias_places_fk_user_fk_key" ON "Alias"("alias", "places_fk", "user_fk");

-- CreateIndex
CREATE UNIQUE INDEX "Routes_start_id_end_id_user_fk_key" ON "Routes"("start_id", "end_id", "user_fk");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Airtemp_timestamp_station_id_key" ON "Airtemp"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Humidity_timestamp_station_id_key" ON "Humidity"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rainfall_timestamp_station_id_key" ON "Rainfall"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Winddir_timestamp_station_id_key" ON "Winddir"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Windspeed_timestamp_station_id_key" ON "Windspeed"("timestamp", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stations_device_id_reading_type_key" ON "Stations"("device_id", "reading_type");

-- CreateIndex
CREATE UNIQUE INDEX "_PlacesToUser_AB_unique" ON "_PlacesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlacesToUser_B_index" ON "_PlacesToUser"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_places_fk_fkey" FOREIGN KEY ("places_fk") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_user_fk_fkey" FOREIGN KEY ("user_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_start_id_fkey" FOREIGN KEY ("start_id") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_end_id_fkey" FOREIGN KEY ("end_id") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_user_fk_fkey" FOREIGN KEY ("user_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlacesToUser" ADD CONSTRAINT "_PlacesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlacesToUser" ADD CONSTRAINT "_PlacesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
