export default {
  apiUrl:
    process.env.WORDPRESS_API_URL ?? "http://wordpress/?rest_route=",
  apiSecret: process.env.WORDPRESS_API_SECRET ?? "",
};
