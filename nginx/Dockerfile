FROM nginx:stable-alpine

RUN apk add certbot certbot-nginx

COPY certbot-renew /etc/periodic/weekly

RUN chmod +x /etc/periodic/weekly/certbot-renew

RUN rm /etc/nginx/conf.d/default.conf && \ 
  mv /usr/share/nginx/html/index.html /usr/share/nginx/html/nginx-index.html

COPY conf.d /etc/nginx/templates

COPY certbot-init.sh /docker-entrypoint.d/99-certbot-init.sh

RUN chmod +x /docker-entrypoint.d/99-certbot-init.sh
