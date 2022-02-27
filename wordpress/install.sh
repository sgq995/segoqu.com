wp core config \
  --dbhost=${WORDPRESS_DB_HOST} \
  --dbuser=${WORDPRESS_DB_USER} \
  --dbpass=${WORDPRESS_DB_PASSWORD} \
  --dbname=${WORDPRESS_DB_NAME} \

wp core install \
  --url=${WP_URL} \
  --title=${WP_TITLE} \
  --admin_user=${WP_ADMIN_USER} \
  --admin_password=${WP_ADMIN_PASSWORD} \
  --admin_email=${WP_ADMIN_MAIL}

wp plugin activate segoqu-rest-only segoqu-rest-security
