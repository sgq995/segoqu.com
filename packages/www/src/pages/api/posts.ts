import type { NextApiRequest, NextApiResponse } from "next";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL ?? "";

type Post = {
  date: string;
  date_gmt: string;
  id: number;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  categories: number[];
  tags: number[];
};

type PostList = {
  data?: Post[];
  err?: unknown;
  page: number;
  total: number;
};

async function get(queryPage = 1): Promise<PostList> {
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
  console.log({ url });

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
        total
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostList>
) {
  const page = Number(req.query.page);
  const posts = await get(page);

  res.status(200).json(posts);
}
