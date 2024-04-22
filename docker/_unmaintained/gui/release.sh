#!/usr/bin/env bash
set -e

docker build -t usepico/gui .
docker push usepico/gui
