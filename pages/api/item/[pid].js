import { connectDatabase, getSingleDocument } from "../../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const queryId = req.query.pid;
  console.log("queryId", queryId);
  const item = await getSingleDocument(client, "inventory", Number(queryId));
  res.json(item);
};
