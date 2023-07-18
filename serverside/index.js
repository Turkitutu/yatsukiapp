const express = require("express");
const cors = require("cors");
const api = require("./routes/api");
const coronaScraping = require("./corona/coronaScraping");
require("dotenv").config();
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send(
    "<h1>Yatsukiapp (New portfolio coming soon!)</h1><p><a href='/corona'>Corona projet (Rewritten with react)</a></p><p><a href='/games/tetris'>Tetris game!</a></p><p><a href='/games/o'>tic tac toe game!</a></p>"
  );
});

const coronaPath = path.join(__dirname, "public", "corona");

app.use(express.static(coronaPath));

app.get("/corona", (req, res) => {
  res.sendFile(path.join(coronaPath, "index.html"));
});

app.use(express.static("public"));

app.use(cors());
app.set("json spaces", 2);

app.use("/api", api);

app.use("*", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}/ :p`);
  coronaScraping.fetchData();
  setInterval(() => {
    coronaScraping.updateData();
  }, 900000);
});
