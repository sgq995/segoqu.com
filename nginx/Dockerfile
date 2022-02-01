FROM nginx:stable-alpine

RUN apk add certbot certbot-nginx

COPY certbot-renew /etc/periodic/weekly

RUN chmod +x /etc/periodic/weekly/certbot-renew

RUN rm /etc/nginx/conf.d/default.conf

COPY conf.d /etc/nginx/conf.d
