FROM openpitrix/dashboard-env-slim:v0.2.0 as builder
MAINTAINER sunnyw <sunnywang@yunify.com>

ARG SKIP_NODE_SASS_TESTS=true

ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app

COPY package.json yarn.lock /tmp/

RUN cd /tmp && mkdir -p node_modules /app \
    && yarn install --pure-lockfile --prefer-offline

COPY . /app

RUN cd /app && ln -fs /tmp/node_modules/ \
    && yarn build


FROM leoendlessx/gatsby:latest

WORKDIR /pub

RUN mkdir -p /pub

COPY --from=builder /app/public/ /pub
COPY nginx-server-rules.conf /etc/nginx/server.conf
