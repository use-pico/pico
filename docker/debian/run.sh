#!/usr/bin/env bash

docker build -t leightcore/debian .
docker run -it --rm leightcore/debian bash
