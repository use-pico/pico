#!/usr/bin/env bash
set -e

docker build -t leightcore/debian .
docker push leightcore/debian
