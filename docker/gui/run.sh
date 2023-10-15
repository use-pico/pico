#!/usr/bin/env bash
set -e

docker build -t leightcore/gui .
docker compose up
