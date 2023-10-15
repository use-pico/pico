#!/usr/bin/env bash
set -e

docker build -t leightcore/gui .
docker push leightcore/gui
