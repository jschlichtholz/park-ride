FROM node:6.6.0
MAINTAINER Julian Schlichtholz <julian.schlichtholz@gmail.com>

# Prepare environment
RUN apt-get update \
 && apt-get install -y cron r-base supervisor --no-install-recommends \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g angular-cli \
 && npm install -g http-server \
 && mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN ng build --prod \
 && crontab /usr/src/app/stats/crontab

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/usr/src/app/supervisord.conf"]
