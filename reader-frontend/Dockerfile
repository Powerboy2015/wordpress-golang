# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---------- development ----------
FROM base AS dev

EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true
ENV FAST_REFRESH=true

ENV PATH=/app/node_modules/.bin:$PATH
CMD ["npm", "start"]

# ---------- build ----------
FROM base AS build
COPY . .
RUN npm run build

# ---------- production ----------
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]