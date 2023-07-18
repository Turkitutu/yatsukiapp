const router = require("express").Router();

router.use("/corona", require("./coronaRoutes"));

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API!" });
});
module.exports = router;
