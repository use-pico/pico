FROM usepico/debian as build

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        wget

RUN \
    wget https://www.imagemagick.org/download/ImageMagick.tar.gz

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        g++ libc6-dev

RUN \
    tar xf ImageMagick.tar.gz && \
    cd ImageMagick* && ./configure --with-heic=yes && \
        make && \
        make install

ADD rootfs /

FROM usepico/debian as runtime

COPY --from=composer /usr/bin/composer /usr/local/bin/composer
COPY --from=build /usr/local/bin/magick /usr/local/bin/magick
COPY --from=build /usr/local/lib/libMagickCore-7.Q16HDRI.so.10 /usr/local/lib/libMagickCore-7.Q16HDRI.so.10
COPY --from=build /usr/local/lib/libMagickWand-7.Q16HDRI.so.10 /usr/local/lib/libMagickWand-7.Q16HDRI.so.10

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        nginx libgomp1

RUN \
    ldconfig
