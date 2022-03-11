import type { NextPage } from "next";
import Head from "next/head";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "../components/Material";

import Link from "../components/Link";

interface HomeProps {
  posts: PostFindAllResponse;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Sebastian Gonzalez Quintero</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={2}>
        {posts.data?.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardActionArea component={Link} href={`/blog/${post.slug}`}>
              <CardContent>
                <Typography variant="subtitle2">{post.date}</Typography>
                <Typography variant="h3">{post.title.rendered}</Typography>
                <Box
                  sx={{ typography: "body2" }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Home;

import type { PostFindAllResponse } from "../services/wordpress/post.service";

export async function getStaticProps() {
  const { default: PostService } = await import(
    "../services/wordpress/post.service"
  );

  let posts: PostFindAllResponse;
  try {
    posts = await PostService.findAll();
  } catch (err) {
    posts = {
      page: 0,
      total: 0,
    };
  }

  return {
    props: { posts },
    revalidate: 10,
  };
}
