const express = require("express");
const router = express.Router();

const {
  data,
  dataStates,
  updateData,
  countriesData,
} = require("../../corona/coronaScraping");

const checkForUpdate = (req, res, next) => {
  if (!data.api.updated) updateData();
  next();
};

router.get("/", checkForUpdate, (req, res) => {
  res.json(data);
});

router.get("/:country", checkForUpdate, (req, res, next) => {
  const c = req.params.country.toLowerCase();
  for (i in data.data) {
    if (i.toLowerCase() == c) {
      if (dataStates[i])
        res.json({ api: data.api, data: data.data[i], states: dataStates[i] });
      else res.json({ api: data.api, data: data.data[i], states: [] });

      return;
    }
  }
  next();
});

router.get("/countries", checkForUpdate, (req, res) => {
  res.json(countriesData.countriesNames);
});
module.exports = router;
