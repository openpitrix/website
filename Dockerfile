FROM node:9-alpine as builder

ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app

# install deps for libvips
#RUN apk add vips-dev fftw --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

COPY package.json yarn.lock /tmp/

RUN cd /tmp && mkdir -p node_modules /app \
    && yarn install --pure-lockfile --prefer-offline

COPY . /app

RUN cd /app && ln -fs /tmp/node_modules/ \
    && yarn build


FROM gatsbyjs/gatsby:latest

WORKDIR /pub

RUN mkdir -p /pub

COPY --from=builder /app/public/ /pub
