import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Box, Breadcrumbs, Stack, Typography } from "../../components/Material";

import Link from "../../components/Link";

import type { Post } from "../../services/wordpress/models/post.model";

import useHtmlParser from "../../hooks/useHtmlParser";

interface BlogPostProps {
  post?: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  const content = useHtmlParser(post?.content.rendered ?? "");

  if (post) {
    return (
      <>
        <Head>
          <title>{post.title.rendered}</title>
          <meta name="description" content={post.excerpt.rendered} />
          <link rel="icon" href="/favicon.ico" />
          {/* TODO: Add keywords, tags, categories SEO */}
        </Head>

        <Box sx={{ mb: 4 }}>
          <Breadcrumbs>
            <Link underline="hover" href="/">
              Home
            </Link>
            <Typography color="text.primary">{post.title.rendered}</Typography>
          </Breadcrumbs>
        </Box>

        <Stack>
          <Typography variant="subtitle2">{post.date}</Typography>
          <Typography variant="h2">{post.title.rendered}</Typography>

          {content}
        </Stack>
      </>
    );
  } else {
    return <></>;
  }
};

export default BlogPost;

import type { PostFindAllResponse } from "../../services/wordpress/post.service";

export async function getStaticPaths() {
  const { default: postService } = await import(
    "../../services/wordpress/post.service"
  );

  let posts: PostFindAllResponse;
  try {
    posts = await postService.findAll();
  } catch (err) {
    posts = { page: 0, total: 0 };
  }

  const paths =
    posts.data?.map((post) => {
      return {
        params: { slug: post.slug },
      };
    }) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps<
  BlogPostProps,
  { slug: string }
> = async ({ params }) => {
  const { default: postService } = await import(
    "../../services/wordpress/post.service"
  );

  let post: Post | null;
  try {
    post = await postService.findOne(params?.slug ?? "");
  } catch (err) {
    post = null;
  }

  if (!post) {
    return {
      notFound: true,
      // TODO: Define time constant, e. g. SECOND = 1, MINUTE = 60, HOUR = 3600
      revalidate: 3600,
    };
  }

  return {
    props: { post },
    // TODO: Add to environment variables
    revalidate: 3600,
  };
};
