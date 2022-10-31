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
export async function getStaticProps() {
  const fs = require("fs").promises;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // current working directory, 'root'
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
