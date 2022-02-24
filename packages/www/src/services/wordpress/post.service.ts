const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL ?? "";

import type { Post } from "./models/post.model";

export type PostFindAllResponse = {
  data?: Post[];
  err?: unknown;
  page: number;
  total: number;
};

class PostService {
  async _request(method: RequestInit["method"], path: string, params?: object) {
    const headers = { "Content-Type": "application/json" };
    const baseUrl = new URL(`${WORDPRESS_API_URL}${path}`);
    const query = new URLSearchParams({
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
      ...params,
    });

    baseUrl.searchParams.forEach((value, key) => query.append(key, value));

    const url = `${baseUrl.origin}${baseUrl.pathname}?${query.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    return res;
  }

  async findAll(queryPage = 1): Promise<PostFindAllResponse> {
    const page = queryPage ?? 1;

    const res = await this._request("GET", "/posts", { page: String(page) });

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

  async findOne(slug: Post["slug"]): Promise<Post | undefined> {
    const res = await this._request("GET", "/posts", { slug });
    const json = await res.json();
    return json[0];
  }
}

export default new PostService();
