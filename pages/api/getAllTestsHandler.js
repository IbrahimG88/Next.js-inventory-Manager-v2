import { connectDatabase } from "../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const items = await db.collection("inventory").find({}).toArray();
  return res.json(items);
};
