import Head from "next/head";
import Link from "next/link";
import { Header, PostWidget, PostCard, Categories } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections/index";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog - Royal Diadems</title>
        <link rel="icon" size="192x192" href="/royal-diadems-logo.png" />
      </Head>
      <Header />
      <FeaturedPosts />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <div className="mb-10 text-center bg-black bg-opacity-20 p-3 rounded-full">
              <span className="transition duration-700 mr-9 cursor-pointer text-white hover:text-green-200 text-2xl font-semibold">
                <Link href="https://royal-diadems.web.app/">Home</Link>
              </span>
              <span className="transition duration-700 cursor-pointer hover:text-green-200 text-white text-2xl ml-3 font-semibold">
                <Link href="/">All</Link>
              </span>
            </div>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
