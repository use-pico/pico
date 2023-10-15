FROM debian

ENV \
    DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        ca-certificates curl git wget supervisor bash bzip2 lzma xz-utils zip unzip unrar-free p7zip-full && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        nodejs && \
    npm install -g npm && \
    npm install -g pnpm && \
    npm install -g yarn && \
    mkdir -p /etc/supervisor/conf.d

ADD rootfs /

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

WORKDIR /root
