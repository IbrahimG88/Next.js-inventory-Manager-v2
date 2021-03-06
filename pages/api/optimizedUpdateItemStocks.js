/* eslint-disable import/no-anonymous-default-export */
import { connectDatabase } from "../../helpers/db-utils";
//working
export default async (req, res) => {
  const client = await connectDatabase();
  const db = client.db();
  const finalArray = req.body;
  // console.log("body finalArray", finalArray);

  // console.log("body object", req.body);

  for (const key in finalArray) {
    // console.log("name", finalArray[key].name),
    //   console.log("frequency", finalArray[key].frequency),
    //    console.log("finalArray[key]", finalArray[key]);

    async function calculateStocksZero() {
      const oldItem = await db
        .collection("inventory")
        .find({ testName: finalArray[key].name })
        .toArray();

      return oldItem[0].TotalStocks;
    }

    // console.log("calculateStocksZero() ", await calculateStocksZero());

    if ((await calculateStocksZero()) - finalArray[key].frequency <= 0) {
      const ZeroItem = await db
        .collection("inventory")
        .updateOne(
          { testName: finalArray[key].name },
          { $set: { TotalStocks: 0 } }
        );

      //  console.log("ZeroItem", ZeroItem);
    } else if ((await calculateStocksZero()) - finalArray[key].frequency > 0) {
      const item = await db
        .collection("inventory")
        .updateOne(
          { testName: finalArray[key].name },
          { $inc: { TotalStocks: Number(-finalArray[key].frequency) } }
        );

      //   console.log("item", item);
    }

    //console.log("item", item);
    //res.json(item);
  }

  res.status(201).json({ message: "All Items Updated" });
};

// try to move function back to db-utils

// next use min if item below zero $set:{TotalStocks: Number(0)}
