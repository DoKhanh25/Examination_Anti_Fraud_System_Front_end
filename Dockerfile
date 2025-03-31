FROM node:18.17.1-alpine AS builder

WORKDIR /user/local/app
COPY ./ /user/local/app/


RUN npm cache clean --force && npm install
RUN npm run build

FROM nginx:latest 

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /user/local/app/dist/client/browser/ /usr/share/nginx/html

EXPOSE 80
