import ReactMarkdown from "react-markdown";

import PostHeader from "./post-header";

import classes from "./post-content.module.css";

const DUMMY_POST = {
  slug: "getting-started-with-next",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-11-10",
  content: `
# This is a first post
### this is a markdown
`,
};

function PostContent() {
  // const imagePath = `/images/posts/${slug}/${image}`;
  const imagePath = `/images/site/noah.png`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
