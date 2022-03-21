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

  const router = useRouter();

  function handleClick(test, index) {
    console.log("clickname", test);
    console.log("clickindex", index);

    router.push({
      pathname: `/itemData/${index}`,
    });
  }

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
    <Fragment>
      <p>
        Type to filter the list:
        <Input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
}
