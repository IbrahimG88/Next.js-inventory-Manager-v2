import { connectDatabase } from "../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const { id, stocksAdded } = req.body;
  console.log("body id", id);
  console.log("body stocksAdded", Number(stocksAdded));
  console.log("body object", req.body);
  const item = await db
    .collection("inventory")
    .updateOne(
      { id: Number(id) },
      { $inc: { TotalStocks: Number(stocksAdded) } }
    );
  console.log("item", item);
  res.json(item);
};
// try to move function back to db-utils
