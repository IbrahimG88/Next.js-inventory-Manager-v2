import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";

import { Container, Text, Box } from "@chakra-ui/react";

import useSWR from "swr";

export default function ItemId() {
  const [itemFound, setItemFound] = useState();
  const router = useRouter();

  const { id } = router.query;

  console.log("myId", id);

  const { data, error } = useSWR(`../api/item/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  ); // it takes one argument thats the identifoer which would be the url for the request
  // thats the data we get from that request

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setItemFound(data);
    }
  }, [data]);

  if (!itemFound) {
    return <p>No data yet</p>;
  }

  console.log("id", id);

  console.log("pathname", router.pathname); // project/[projectid]
  console.log("query", router.query); // project/thename <anyprojectid>

  return (
    <Fragment>
      {itemFound.map((item) => (
        <Container centerContent maxW="container.lg" key={item._id}>
          <Box>
            <Text>
              {item.id} - {item.testName}
            </Text>
          </Box>
        </Container>
      ))}
    </Fragment>
  );
}
