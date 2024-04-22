#!/usr/bin/env bash
set -e

docker build -t usepico/ssh .
docker run -it --rm usepico/ssh
