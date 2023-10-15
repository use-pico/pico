#!/usr/bin/env bash

docker build -t leightcore/alpine .
docker run -it --rm leightcore/alpine bash
