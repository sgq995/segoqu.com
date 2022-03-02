import BaseService from "./base.service";
import type { Post } from "./models/post.model";

// TODO: Create data transfer objects
export type PostFindAllResponse = {
  data?: Post[];
  err?: unknown;
  page: number;
  total: number;
};

class PostService extends BaseService {
  async _requestPosts(
    method: RequestInit["method"],
    path?: string,
    params?: object
  ) {
    const body = new URLSearchParams({
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

    return this._request(`/wp/v2/posts${path}`, {
      method,
      body,
    });
  }

  async findAll(queryPage = 1): Promise<PostFindAllResponse> {
    const page = queryPage ?? 1;

    const res = await this._requestPosts("GET", "", {
      page: String(page),
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
          data: null,
          err: json.data,
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

  async findOne(slug: Post["slug"]): Promise<Post | null> {
    const res = await this._requestPosts("GET", "", { slug });
    const json = await res.json();
    return json[0] ?? null;
  }
}

export default new PostService();
