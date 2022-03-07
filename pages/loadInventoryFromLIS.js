// not used anymore in the app just read it

import { useRouter } from "next/router";

export const getStaticProps = async () => {
  return fetch("http://197.45.107.206/api2/integration/tests")
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const transformedTestsList = []; // to transform an object into an array
      for (const key in data) {
        transformedTestsList.push({
          id: data[key].profile_id,
          testName: data[key].report_name,
        });
      }

      return {
        props: {
          testsList: transformedTestsList,
        },
        revalidate: 10,
      };
    });
};

function LoadInventoryFromLIS(props) {
  const router = useRouter();
  const { testsList } = props;

  async function addInventoryItemHandler() {
    console.log(testsList);
    // use of Fetch API to make a request to the new-meal api and get back a response
    await fetch("/api/basicHandler", {
      method: "POST",
      body: JSON.stringify(testsList[0]),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .then(
        router.push({
          pathname: "/",
        })
      );
  }

  if (!testsList) {
    return <p> failed to load data</p>;
  }

  return (
    <div>
      <ul>
        {testsList.map((test) => (
          <li key={test.id}> {test.testName}</li>
        ))}
      </ul>
      <button onClick={addInventoryItemHandler}>CLick me to load tests</button>
    </div>
  );
}

export default LoadInventoryFromLIS;

//form and submit to run addinventoryitemhandler with argument of the item to add
// getstatic props to get the test items from lis
