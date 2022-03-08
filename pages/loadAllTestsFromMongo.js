import { useEffect, useState } from "react";

function LoadTestsFromMongo() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("api/getAllTestsHandler")
      .then((response) => response.json())
      .then((data) => {
        //data from firebase will be returned as an object and nested ones
        const transformedSales = []; // to transform an object into an array
        for (const key in data) {
          transformedSales.push({
            id: data[key].id,
            testName: data[key].testName,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
        console.log("sss", transformedSales);
      });
  }, []);

  if (isLoading) {
    return <p>Loading... </p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.id} - {sale.testName}
        </li>
      ))}
    </ul>
  );
}

export default LoadTestsFromMongo;

//form and submit to run addinventoryitemhandler with argument of the item to add
// getstatic props to get the test items from lis
