import { connectDatabase } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const client = await connectDatabase();
    const db = client.db();
    const testsList = req.body;

    for (const key in testsList) {
      const addItem = await db.collection("inventory").updateOne(
        { testName: testsList[key].testName },
        {
          $set: { id: testsList[key].id, testName: testsList[key].testName },
        },
        { upsert: true }
      );
    }
  }
  res.status(201).json({ message: "All Items Saved" });
}

export default handler;
