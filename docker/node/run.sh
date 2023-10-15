#!/usr/bin/env bash

docker build -t leightcore/node .
docker run -it --rm leightcore/node bash
