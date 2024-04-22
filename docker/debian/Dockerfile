FROM debian

ENV \
    DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        openssh-server ca-certificates curl git wget supervisor bash bzip2 lzma xz-utils zip unzip unrar-free p7zip-full && \
    curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
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

RUN \
    echo 'root:1234' | chpasswd && \
    chmod 600 -R /etc/ssh && \
    chmod 600 -R /root/.ssh && \
    chmod +x -R /usr/local/bin && \
    mkdir -p /var/run/sshd && \
    chmod 0755 -R /var/run/sshd \
