#!/usr/bin/env bash
set -e

docker build -t usepico/alpine .
docker push usepico/alpine
