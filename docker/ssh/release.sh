#!/usr/bin/env bash
set -e

docker build -t leightcore/ssh .
docker push leightcore/ssh
