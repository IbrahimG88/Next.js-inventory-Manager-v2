import { connectDatabase, postManyDocuments } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const testsList = req.body;
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await postManyDocuments(client, "inventory", testsList);
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "All Items Saved" });
  }
}

export default handler;
