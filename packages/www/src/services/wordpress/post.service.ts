const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL ?? "";

import type { Post } from "./models/post.model";

export type PostFindAllResponse = {
  data?: Post[];
  err?: unknown;
  page: number;
  total: number;
};

class PostService {
  async findAll(queryPage = 1): Promise<PostFindAllResponse> {
    const page = queryPage ?? 1;

    const headers = { "Content-Type": "application/json" };
    const baseUrl = new URL(`${WORDPRESS_API_URL}/posts`);
    const params = new URLSearchParams({
      _fields: [
        "date",
        "date_gmt",
        "id",
        "modified",
        "modified_gmt",
        "slug",
        "status",
        "title",
        "content",
        "excerpt",
        "categories",
        "tags",
      ].join(","),
      page: String(page),
    });

    baseUrl.searchParams.forEach((value, key) => params.append(key, value));

    const url = `${baseUrl.origin}${baseUrl.pathname}?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    const total = Number(res.headers.get("X-WP-Total"));

    try {
      const json = await res.json();
      if (json.errors) {
        console.log(json.errors);
      }

      if (res.status === 200) {
        return {
          data: json,
          page,
          total,
        };
      } else {
        return {
          ...json,
          page,
          total,
        };
      }
    } catch (err) {
      return {
        err,
        page,
        total,
      };
    }
  }
}

export default new PostService();
