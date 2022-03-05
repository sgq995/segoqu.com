import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Stack from "@mui/material/Stack";
import { Box, Breadcrumbs, Typography } from "@mui/material";

import Link from "../../components/Link";

import postService, {
  PostFindAllResponse,
} from "../../services/wordpress/post.service";
import { Post } from "../../services/wordpress/models/post.model";

import useHtmlParser from "../../hooks/useHtmlParser";

interface BlogPostProps {
  post?: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  if (post) {
    const content = useHtmlParser(post.content.rendered);

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

          {/* <Box
            sx={{ maxWidth: '100%' }} 
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          /> */}

          {content}
        </Stack>
      </>
    );
  } else {
    return <></>;
  }
};

export default BlogPost;

export async function getStaticPaths() {
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
