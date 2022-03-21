import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
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
    };
    console.log("newSales", newSales);
    sales = newSales;
    console.log("sales", sales);
    setSales(sales);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
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
            id: data[key].id,
            testName: data[key].testName,
            date: data[key].date,
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
    <Accordion allowToggle>
      Type to filter the list:
      <Input
        id="filter"
        name="filter"
        type="text"
        value={filter}
        placeholder="search for test..."
        onChange={(event) => setFilter(event.target.value)}
      />
      {sales
        .filter((f) => f.testName.indexOf(filter) > -1)
        .map((item, index) => (
          <AccordionItem key={item._id}>
            <h2>
              <AccordionButton _expanded={{ bg: "blue", color: "white" }}>
                <Box flex="1" textAlign="left">
                  {item.testName}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Input
                placeholder="stocks to add..."
                type="number"
                name="amountsInStock"
                id="amountsInStock"
                value={amountsInput}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
