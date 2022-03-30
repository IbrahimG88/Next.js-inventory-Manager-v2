//ignore file:

import { useState, useEffect } from "react";

export default function FrequencyWorklist() {
  const [date, setDate] = useState();
  const panelTypes = [];
  const finalArray = [];

  useEffect(() => {
    const fetchDate = async () => {
      const data = await fetch("http://localhost:3000/api/item/1");

      const json = await data.json();

      console.log("json", json[0].date);
      const date = new Date(json[0].date);
      console.log("date", date);
      setDate(date);
    };

    fetchDate();
    console.log("date...", date);

    if (date === undefined) {
      return <p>loading...</p>;
    }

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

    const dateSample = dateIndividualData(date);
    const fetchConsumptionData = async () => {
      const response = fetch(
        `http://197.45.107.206/api2/integration/worklist/${dateSample.year}-${
          dateSample.month
        }-${dateSample.day}%2000:00:00:00/${nowDate().year}-${
          nowDate().month
        }-${nowDate().day}%2000:00:00:00`
      ).then((response) => {
        return response.json().then((data) => {
          return data;
        });
      });
    };

    for (const key in fetchConsumptionData) {
      for (const myItem in fetchConsumptionData[key].panels) {
        panelTypes.push(fetchConsumptionData[key].panels[myItem].report_name);
      }
    }
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
  }, []);

  return (
    <ul>
      {finalArray.map((item) => (
        <li key={item.name} suppressHydrationWarning={true}>
          {item.name}:{item.frequency}
        </li>
      ))}
    </ul>
  );
}
