import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { albums?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const albumsCollections: mongoDB.Collection = db.collection(
    process.env.ALBUMS_COLLECTION_NAME
  );

  collections.albums = albumsCollections;

  console.log(
    `Successfully connected to database: ${db.databaseName}`
  );
}
