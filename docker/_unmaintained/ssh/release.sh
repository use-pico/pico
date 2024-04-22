#!/usr/bin/env bash
set -e

docker build -t usepico/ssh .
docker push usepico/ssh
