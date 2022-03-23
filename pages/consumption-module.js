import { injectStylesIntoStaticMarkup } from "@mantine/next";
import { Suspense } from "react";

export const panelTypes = [];

export const getStaticProps = async () => {
  const res = await fetch(
    "http://197.45.107.206/api2/integration/worklist/2021-12-02%2000:00:00:00/2021-12-05%2000:00:00:00"
  ).then((response) => {
    return response.json().then((data) => {
      return data;
    });
  });

  return {
    props: { res },
  };
};

const FrequencyWorklist = () => {
  const result = {};
  const finalArray = [];

  const custFreq = panelTypes.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;
    // if (acc[curr] >= 3) {
    // result[curr] = acc[curr];
    // }
    //console.log("acc", acc); //whole list;
    //console.log("curr", curr); //names;
    //console.log("acc[cur]", acc[curr]); //frequency;

    return acc;

    //return acc;
  }, {});

  for (const key in custFreq) {
    console.log("key", key);
    console.log(" custFreq[key]", custFreq[key]);
    finalArray.push({
      name: key,
      frequency: custFreq[key],
    });
  }

  //console.log("custFreq", custFreq);
  // console.log("result:", result);
  //custFreq is what I need
  //const custFreqArray = [];
  //custFreqArray.push(custFreq);
  // console.log("custFreqArray", custFreqArray);
  return (
    <ul>
      {finalArray.map((item) => (
        <li key={item.name}>
          {item.name}:{item.frequency}
        </li>
      ))}
    </ul>
  );
};

const OccurrancestrialsPage = ({ res }) => {
  //  console.log("res", res);

  return (
    <>
      <div>
        <ul>
          {res.map((item) => {
            item.panels.map((occurrances) => {
              panelTypes.push(occurrances.report_name);
              return panelTypes;
            });
          })}
        </ul>
        <FrequencyWorklist />
      </div>
    </>
  );
};
export default OccurrancestrialsPage;

// meed to only add the final occurrance create and not by each count added
