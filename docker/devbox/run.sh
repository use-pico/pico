#!/usr/bin/env bash
set -e

docker build -t leightcore/devbox .
docker compose up
