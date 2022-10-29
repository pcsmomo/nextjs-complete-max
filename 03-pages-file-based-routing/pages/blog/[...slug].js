import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();

  console.log(JSON.stringify(router.query, null, 4));

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}

export default BlogPostsPage;
