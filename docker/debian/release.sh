#!/usr/bin/env bash
set -e

docker build -t usepico/debian .
docker push usepico/debian
