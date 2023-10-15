#!/usr/bin/env bash
set -e

docker build -t leightcore/ssh .
docker run -it --rm leightcore/ssh
