const express = require("express");
const cors = require("cors");
const api = require("./routes/api");
require("dotenv").config();
const coronaScraping = require("./corona/coronaScraping");

const app = express();

app.use(cors());
app.set("json spaces", 2);

app.use("/api", api);

app.use("/", express.static("public"));

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
