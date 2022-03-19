import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb://Ibrahim2222:Ibrahim2222@cluster0-shard-00-00.r1pn0.mongodb.net:27017,cluster0-shard-00-01.r1pn0.mongodb.net:27017,cluster0-shard-00-02.r1pn0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3l371a-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection) {
  const db = client.db();

  const documents = await db.collection(collection).find({}).toArray();
  console.log(documents);
  return documents;
}

export async function postManyDocuments(client, collection, arrayToInsert) {
  const db = client.db();
  const date = new Date();
  arrayToInsert.forEach((element) => {
    element.date = date;
  });

  if (
    (await arrayToInsert.length) ===
    (await db.collection(collection).countDocuments({}))
  ) {
    return null;
  } else {
    const documents = db.collection(collection).insertMany(arrayToInsert);
    return documents;
  }
}

export async function getSingleDocument(client, collection, itemId) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .find({ id: itemId })
    .toArray();
  console.log(document);
  return document;
}
