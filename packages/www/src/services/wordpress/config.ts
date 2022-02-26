export default {
  apiUrl:
    process.env.WORDPRESS_API_URL ?? "http://wordpress/?rest_route=/wp/v2",
  apiSecret: process.env.WWW_WP_API_SECRET ?? "",
};
