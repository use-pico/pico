FROM leightcore/gui

WORKDIR /home/devbox

RUN \
    wget https://download.jetbrains.com/idea/ideaIU-2023.1.1.tar.gz && \
    tar -xzf ideaIU-2023.1.1.tar.gz -C /opt

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        git openssh-client kate krename kdiff3 kompare libxtst6 firefox-esr chromium libxss1
