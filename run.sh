#!/bin/bash

chmod +x stop.sh
chmod +x clean.sh
chmod +x getIp.sh

./clean.sh

controllerIpSetting="CONTROLLER_ADDRESS=\""
controllerIpSetting+=$(./getIp.sh)
controllerIpSetting+="\""

echo "[PECI RUN TOOL]   Cloning most recent vesion!"
git clone -b backend\-devel git@github.com:detiuaveiro/PECI-05-2022-23.git backend
echo $controllerIpSetting >> backend/.env

git clone -b auth git@github.com:detiuaveiro/PECI-05-2022-23.git auth_server

git clone -b frontend git@github.com:detiuaveiro/PECI-05-2022-23.git frontend/server

git clone -b DataFetcherAndAlarmSystemImproved git@github.com:detiuaveiro/PECI-05-2022-23.git AlertSystem

git clone -b MockNetworkController git@github.com:detiuaveiro/PECI-05-2022-23.git MockNetworkController

echo "[PECI RUN TOOL]   Initializing dockers!"
docker compose up -d
