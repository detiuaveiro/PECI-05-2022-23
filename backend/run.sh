#!/bin/bash

chmod +x stop.sh
chmod +x getIp.sh


controllerIpSetting="CONTROLLER_ADDRESS=\""
controllerIpSetting+=$(./getIp.sh)
controllerIpSetting+="\""

docker compose up -d
