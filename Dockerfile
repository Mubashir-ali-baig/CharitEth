FROM node:lts-alpine as builder
RUN apk --no-cache add git
RUN apk add --no-cache python python-dev python3 python3-dev \
    linux-headers build-base bash git ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache
RUN apk update

WORKDIR '/app'

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html


