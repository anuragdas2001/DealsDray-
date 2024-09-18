import mongoose from "mongoose";
const EstablishDBConnection = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URI);

  if (!connection) {
    console.log("Failed to establish DB connection");
  }
  console.log("DB connection established successfully");
};

export default EstablishDBConnection;
