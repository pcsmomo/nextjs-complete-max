import path from "path";

// run second
function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// run first: consider it that it's not on front side
export async function getStaticProps(context) {
  console.log("(Re-)Generating...");
  const fs = require("fs").promises;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // current working directory, 'root'
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
