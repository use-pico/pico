#!/usr/bin/env bash
set -e

docker build -t usepico/node .
docker push usepico/node
