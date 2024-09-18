import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.json({ ping: pong });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
