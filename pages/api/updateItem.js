import { connectDatabase, updateDocument } from "../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const { id, stocksAdded } = req.body;
  console.log("body id", id);
  console.log("body stocksAdded", stocksAdded);
  const item = await updateDocument(
    client,
    "inventory",
    Number(id),
    Number(stocksAdded)
  );
  res.json(item);
};
``;
