import { useEffect, useState } from "react";
import useSWR from "swr";

function lastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const fetcher = (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((data) =>
        Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      );

  const { data, error } = useSWR(
    "https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      // const transformedSales = Object.keys(data).map((key) => ({
      //   ...data[key],
      //   id: key,
      // }));

      // setSales(transformedSales);
      setSales(data);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  // return { props: { sales: transformedSales }, revalidate: 10 };
  return { props: { sales: transformedSales } };

  // return fetch(
  //   "https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json"
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const transformedSales = [];
  //
  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       });
  //     }

  //     return { props: { sales: transformedSales }, revalidate: 10 };
  //   });
}

export default lastSalesPage;
