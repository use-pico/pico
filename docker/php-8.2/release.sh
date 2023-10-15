#!/usr/bin/env bash
set -e

docker build -t leightcore/php:8.2 .
docker push leightcore/php:8.2
