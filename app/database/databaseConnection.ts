import mongoose, { Connection } from "mongoose";

// Export the database connection along with the connectToDatabase function
export let database: Connection;

connectToDatabase().catch((err) => console.log(err));

export async function connectToDatabase() {
  console.log("Connecting to the database...");
  const dbString = process.env.DB_STRING;
  if (!dbString) {
    throw new Error("DB_STRING environment variable is not defined");
  }
  await mongoose.connect(dbString).then(() => {
    console.log("Connected to the database!");
    database = mongoose.connection; // Assign the connection to the exported variable
  });
}
