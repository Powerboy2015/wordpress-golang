FROM node:18-alpine

RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime \
    && echo "Europe/Berlin" > /etc/timezone \
    && apk del tzdata

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true
ENV FAST_REFRESH=true

ENV PATH=/app/node_modules/.bin:$PATH
CMD ["npm", "start"]