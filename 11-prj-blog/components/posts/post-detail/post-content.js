import ReactMarkdown from "react-markdown";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;

  // const imagePath = `/images/posts/${slug}/${image}`;
  const imagePath = `/images/site/noah.png`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
