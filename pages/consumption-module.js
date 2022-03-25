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
        <li key={item.name}>
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
