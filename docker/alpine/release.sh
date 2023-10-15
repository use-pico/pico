#!/usr/bin/env bash
set -e

docker build -t leightcore/alpine .
docker push leightcore/alpine
