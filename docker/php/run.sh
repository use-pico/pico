#!/usr/bin/env bash
set -e

docker build -t leightcore/php:base .
docker run -it --rm leightcore/php:base bash
