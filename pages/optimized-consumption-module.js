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
  for (const key in res) {
    for (const myItem in res[key].panels) {
      panelTypes.push(res[key].panels[myItem].report_name);
    }
  }

  const custFreq = panelTypes.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;

    return acc;
  }, {});

  const finalArray = [];

  for (const key in custFreq) {
    finalArray.push({
      name: key,
      frequency: custFreq[key],
    });
  }
  console.log("finalArray look", finalArray);

  fetch("http://localhost:3000/api/optimizedUpdateItemStocks", {
    method: "POST",
    body: JSON.stringify(finalArray),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => console.log("data here", data));

  return {
    props: { finalArray },
  };
};

const FrequencyWorklist = ({ finalArray }) => {
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

export default FrequencyWorklist;

//now just update the current date in collection for app variables and get it from the databse and test it,
// thenstart updating the item stocks by dudction from totalStocks

// the issue all item are being duplicated the frequency:

// your code is running once on server side and again on client move either all on server or all on client to run it once. move all to getstaticprops
