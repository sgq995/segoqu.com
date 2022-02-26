import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import postService from "../../services/wordpress/post.service";
import { Post } from "../../services/wordpress/models/post.model";

interface BlogPostProps {
  post?: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  if (post) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          {/* TODO: Add keywords, tags, categories SEO */}
        </Head>

        <Stack>
          <Typography variant="subtitle2">{post.date}</Typography>
          <Typography variant="h3">{post.title.rendered}</Typography>
          <Typography variant="body2">{post.content.rendered}</Typography>
        </Stack>
      </>
    );
  } else {
    return <></>;
  }
};

export default BlogPost;

export async function getStaticPaths() {
  const posts = await postService.findAll();
  const paths = posts.data?.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps<
  BlogPostProps,
  { slug: string }
> = async ({ params }) => {
  const post = await postService.findOne(params?.slug ?? "");

  if (!post) {
    return {
      notFound: true,
      // TODO: Define time constant, e. g. SECOND = 1, MINUTE = 60, HOUR = 3600
      revalidate: 3600
    };
  }

  return {
    props: { post },
    // TODO: Add to environment variables
    revalidate: 3600,
  };
};
