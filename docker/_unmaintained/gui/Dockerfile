FROM usepico/debian

ENV DISPLAY=:0
ENV PULSE_SERVER=/tmp/PulseServer

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        krusader konsole breeze-icon-theme

CMD krusader
