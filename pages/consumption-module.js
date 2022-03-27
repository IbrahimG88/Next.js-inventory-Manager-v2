import { useState } from "react";

export const panelTypes = [];

export const getStaticProps = async () => {
  // need to get the date from database item here:
  const data = await fetch("http://localhost:3000/api/item/1").then(
    (response) => {
      return response.json().then((data) => {
        console.log("data look", data);
        for (const key in data) {
          const myDate = new Date(data[key].date);
          return myDate;
        }
        console.log("my date look", myDate);
        return myDate;
      });
    }
  );
  console.log("myData", data);

  const dateIndividualData = (singleDate) => {
    const dateObject = {
      day: singleDate.getDate() - 1,
      month: singleDate.getMonth() + 1,
      year: singleDate.getFullYear(),
    };
    console.log("today", dateObject.day);
    return dateObject;
  };

  const nowDate = () => {
    const now = new Date();
    const dateObject = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
    //console.log("today", dateObject.day);
    return dateObject;
  };

  const dateSample = dateIndividualData(data);
  const res = await fetch(
    `http://197.45.107.206/api2/integration/worklist/${dateSample.year}-${
      dateSample.month
    }-${dateSample.day}%2000:00:00:00/${nowDate().year}-${nowDate().month}-${
      nowDate().day
    }%2000:00:00:00`
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
  const finalArray = [];

  const custFreq = panelTypes.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;

    return acc;
  }, {});

  for (const key in custFreq) {
    finalArray.push({
      name: key,
      frequency: custFreq[key],
    });
  }

  return (
    <ul>
      {finalArray.map((item) => (
        <li key={item.name} suppressHydrationWarning={true}>
          {item.name}:{item.frequency}
        </li>
      ))}
    </ul>
  );
};

const OccurrancestrialsPage = ({ res }) => {
  for (const key in res) {
    for (const myItem in res[key].panels) {
      panelTypes.push(res[key].panels[myItem].report_name);
    }
  }
  console.log("panelTypes", panelTypes);

  return <FrequencyWorklist />;
};
export default OccurrancestrialsPage;

// now get the date form the database
