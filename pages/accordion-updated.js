import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";

export default function ItemsList() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  let amountsInput;
  const router = useRouter();

  function handleClick(test, index) {
    console.log("clickname", test);
    console.log("clickindex", index);

    router.push({
      pathname: `/itemData/${index}`,
    });
  }

  const handleChange = (e, i) => {
    const { value, name } = e.target;
    console.log("name", name);
    console.log("value", value);
    const newSales = [...sales];

    newSales[i] = {
      ...newSales[i],
      [name]: value,
      totalStocks: Number(newSales[i].totalStocks),
      updatedStocks: Number(value) + Number(newSales[i].totalStocks),
    };
    console.log("newSales", newSales);
    sales = newSales;
    console.log("sales", sales);
    setSales(sales);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      updateItemHandler(index);
      event.target.value = "";
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("../api/getAllTestsHandler")
      .then((response) => response.json())
      .then((data) => {
        //data from firebase will be returned as an object and nested ones
        const transformedSales = []; // to transform an object into an array
        for (const key in data) {
          transformedSales.push({
            _id: data[key]._id,
            id: data[key].id,
            testName: data[key].testName,
            totalStocks: data[key].TotalStocks,
            date: data[key].date,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
        console.log("sss", transformedSales);
      });
  }, []);

  async function updateItemHandler(itemIndex) {
    console.log("itemIndex", itemIndex);
    sales[itemIndex];
    const updateObject = {
      id: sales[itemIndex].id,
      stocksAdded: sales[itemIndex].stocksAdded,
    };

    console.log("sales[itemIndex]", updateObject);

    await fetch("/api/updateItem", {
      method: "POST",
      body: JSON.stringify(updateObject),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  }

  if (isLoading) {
    return <p>Loading... </p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <Accordion allowToggle>
      Type to filter the list:
      <Input
        id="filter"
        name="filter"
        type="text"
        value={filter}
        placeholder="search for test..."
        onChange={(event) => setFilter(event.target.value.toLowerCase())}
      />
      {sales
        .filter((f) => f.testName.toLowerCase().indexOf(filter) > -1)
        .map((item, index) => (
          <AccordionItem key={item.id}>
            <h2>
              <AccordionButton _expanded={{ bg: "blue", color: "white" }}>
                <Box flex="1" textAlign="left">
                  {item.testName}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text> Add Stocks:</Text>
              <Input
                placeholder="stocks to add..."
                type="number"
                name="stocksAdded"
                id="stocksAdded"
                value={amountsInput}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
              {item.updatedStocks ? (
                <Text>Updated Total Stocks: {item.updatedStocks}</Text>
              ) : (
                <Text>Previous Total Stocks: {item.totalStocks}</Text>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
