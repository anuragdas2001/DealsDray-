import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import EstablishDBConnection from "./db/index.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.json({ ping: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  EstablishDBConnection();
});
