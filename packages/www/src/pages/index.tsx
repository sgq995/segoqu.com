import type { NextPage } from "next";
import Head from "next/head";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Link from "../components/Link";

import PostService, {
  PostFindAllResponse,
} from "../services/wordpress/post.service";

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
                <Typography variant="body2">{post.excerpt.rendered}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Home;

export async function getStaticProps() {
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
