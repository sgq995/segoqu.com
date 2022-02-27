FROM wordpress:apache

# WORKDIR /usr/src/wordpress

# Install WP-CLI (http://wp-cli.org)
RUN curl -o /bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
 && chmod +x /bin/wp

COPY plugins /usr/src/wordpress/wp-content/plugins
COPY plugins /var/www/html/wp-content/plugins
