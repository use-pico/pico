#!/usr/bin/env bash
set -e

docker build -t usepico/devbox .
docker compose up
