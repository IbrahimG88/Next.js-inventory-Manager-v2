//import { connectDatabase, getSingleDocument } from "../../helpers/db-utils";
/*
async function handler(req, res) {
  if (req.method === "GET") {
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const { id } = req.query;
      console.log("id", id);
      const item = await getSingleDocument(client, "inventory", id);
      console.log("item", res.json(item));
      return res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    client.close();
    res.status(201).json({ message: "Item found" });
  }
}
export default handler;

*/
import { connectDatabase, getSingleDocument } from "../../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const queryId = req.query.pid;
  console.log("queryId", queryId);
  const item = await db
    .collection("inventory")
    .find({ id: Number(queryId) })
    .toArray();
  res.json(item);
};
