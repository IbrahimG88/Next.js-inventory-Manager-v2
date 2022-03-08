import { connectDatabase, getAllDocuments } from "../../helpers/db-utils";

//working
async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const items = await getAllDocuments(client, "inventory");
    return res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed!" });
    return;
  }

  client.close();
  res.status(201).json({ message: "All Items Saved" });
}

export default handler;
