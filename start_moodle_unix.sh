#!/bin/bash

# chmod +x start_moodle_unix.sh
# chmod +x server/bin/moodle-docker-compose

export MOODLE_DOCKER_WWWROOT=./server/moodle
export MOODLE_DOCKER_DB=mariadb

echo "Starting Moodle Docker Compose services..."
server/bin/moodle-docker-compose build && server/bin/moodle-docker-compose up -d
echo "Moodle services started."