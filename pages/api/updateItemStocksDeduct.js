/* eslint-disable import/no-anonymous-default-export */
import { connectDatabase } from "../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const { name, frequency } = req.body;
  console.log("body name", name);
  console.log("body frequency", Number(frequency));
  console.log("body object", req.body);

  const item = await db
    .collection("inventory")
    .updateOne(
      { testName: name },
      { $inc: { TotalStocks: Number(-frequency) } }
    );
  console.log("item", item);
  res.json(item);
};
// try to move function back to db-utils

// next use min if item below zero $set:{TotalStocks: Number(0)}
