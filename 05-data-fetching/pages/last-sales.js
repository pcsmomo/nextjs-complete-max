// import { useEffect, useState } from "react";
import useSWR from "swr";

function lastSalesPage() {
  // const [sales, setSales] = useState();

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

  const { data: sales, error } = useSWR(
    "https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  // useEffect(() => {
  //   if (data) {
  //     // const transformedSales = Object.keys(data).map((key) => ({
  //     //   ...data[key],
  //     //   id: key,
  //     // }));

  //     setSales(transformedSales);
  //   }
  // }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  // if (!data || !sales) {
  if (!sales) {
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

export default lastSalesPage;

// import { useEffect, useState } from "react";

// function lastSalesPage() {
//   const [sales, setSales] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch("https://nextjs-course-f4041-default-rtdb.firebaseio.com/sales.json")
//       .then((response) => response.json())
//       .then((data) => {
//         // const transformedSales = [];
//         // for (const key in data) {
//         //   transformedSales.push({
//         //     id: key,
//         //     username: data[key].username,
//         //     volume: data[key].volume,
//         //   });
//         // }

//         const transformedSales = Object.keys(data).map((key) => ({
//           ...data[key],
//           id: key,
//         }));

//         setSales(transformedSales);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!sales) {
//     return <p>No data yet</p>;
//   }

//   return (
//     <ul>
//       {sales.map((sale) => (
//         <li key={sale.id}>
//           {sale.username} - ${sale.volume}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default lastSalesPage;
