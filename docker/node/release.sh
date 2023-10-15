#!/usr/bin/env bash
set -e

docker build -t leightcore/node .
docker push leightcore/node
