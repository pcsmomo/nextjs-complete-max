import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-next",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with buildt-in SSR.",
    date: "2022-11-10",
  },
  {
    slug: "getting-started-with-next2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with buildt-in SSR.",
    date: "2022-11-10",
  },
  {
    slug: "getting-started-with-next3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with buildt-in SSR.",
    date: "2022-11-10",
  },
  {
    slug: "getting-started-with-next4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with buildt-in SSR.",
    date: "2022-11-10",
  },
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}

export default HomePage;
