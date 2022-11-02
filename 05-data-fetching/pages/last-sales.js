import { useEffect, useState } from "react";

function lastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        // const transformedSales = [];
        // for (const key in data) {
        //   transformedSales.push({
        //     id: key,
        //     username: data[key].username,
        //     volume: data[key].volume,
        //   });
        // }

        const transformedSales = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
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

export default lastSalesPage;
