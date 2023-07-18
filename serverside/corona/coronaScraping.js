const axios = require("axios");

const data = {
  api: { updated: false, last_update: 0 },
  data: { World: {} },
};
const dataStates = {
  api: { updated: false, last_update: 0 },
  Tunsia: {},
  States: [],
};

const countriesData = {
  countriesNames: [],
};

function getCountryData(td) {
  let data = {};
  const by = 3;
  data["#"] = getNumber(td[0], by);
  data["cases"] = getNumber(td[2], by);
  data["casesToday"] = getNumber(td[3], by);
  data["deaths"] = getNumber(td[4], by);
  data["deathsToday"] = getNumber(td[5], by);
  data["recovered"] = getNumber(td[6], by);
  data["recoveredToday"] = getNumber(td[7], by);
  data["active"] = getNumber(td[8], by);
  data["critical"] = getNumber(td[9], by);
  data["casesPerOneMillion"] = getNumber(td[10], by);
  data["deathsPerOneMillion"] = getNumber(td[11], by);
  data["tests"] = getNumber(td[12], by);
  data["testsPerOneMillion"] = getNumber(td[13], by);
  return data;
}

function getCountriesData(table) {
  const data = {};
  const tbody = Array.from(table[1].matchAll(/\s?<tbody.*?>(.*?)<\/tbody>/gi));
  var tr = Array.from(tbody[0][1].matchAll(/\s?<tr.*?>(.*?)<\/tr>/gi));

  for (const i in tr) {
    const td = Array.from(
      tr[i][1].matchAll(
        /\s?<td style=".*?">\s?(<a.*?>|)(<span.*?>|)(.*?)(<\/span>|)(<\/a>|)\s?<\/td>/gi
      )
    );
    const name = td[1][3];
    data[name] = {};
    data[name] = getCountryData(td);
  }

  const tr_total = tbody[2][1].match(/\s?<tr.*?>(.*?)<\/tr>/);
  const td_total = Array.from(tr_total[1].matchAll(/\s?<td.*?>(.*?)<\/td>/gi));
  const by = 1;
  data["World"] = {};
  data.World["cases"] = getNumber(td_total[2], by);
  data.World["casesToday"] = getNumber(td_total[3], by);
  data.World["deaths"] = getNumber(td_total[4], by);
  data.World["deathsToday"] = getNumber(td_total[5], by);
  data.World["recovered"] = getNumber(td_total[6], by);
  data.World["active"] = getNumber(td_total[8], by);
  data.World["recoveredToday"] = getNumber(td_total[7], by);
  data.World["critical"] = getNumber(td_total[9], by);
  data.World["casesPerOneMillion"] = getNumber(td_total[10], by);
  data.World["deathsPerOneMillion"] = getNumber(td_total[11], by);
  data.World["tests"] = getNumber(td_total[12], by);
  data.World["testsPerOneMillion"] = getNumber(td_total[13], by);
  data.World["population"] = getNumber(td_total[14], by);
  return data;
}

function getNumber(m, by) {
  return Number(m == undefined ? 0 : m[by].replace(/,/g, ""));
}

const fetchData = async (updating = false) => {
  if (updating) console.log("Updating");
  else console.log("Fetching");

  const names = [];

  await axios.get("http://www.worldometers.info/coronavirus/").then((res) => {
    const body = res.data.replace(/\n/g, "");
    const t = Array.from(
      body.matchAll(
        /<div id="maincounter-wrap".*?>.*?<span.*?>(.*?)<\/span>.*?<\/div>/gi
      )
    );

    const tableToday = body.match(
      /<table id="main_table_countries_today" .*?>(.*?)<\/table>/
    );
    const tableYesterday = body.match(
      /<table id="main_table_countries_yesterday" .*?>(.*?)<\/table>/
    );

    const today = getCountriesData(tableToday);
    const yesterday = getCountriesData(tableYesterday);

    data.data = { World: {} };
    for (const name in today) {
      if (
        !(
          name.includes("<nobr>") ||
          name == "North America" ||
          name == "Europe" ||
          name == "South America" ||
          name == "Asia" ||
          name == "Africa" ||
          name == "Australia/Oceania" ||
          name == "" ||
          name == "All"
        )
      ) {
        if (!Number(today[name].recoveredToday)) {
          today[name].recoveredToday = 0;
          if (yesterday[name]) {
            if (today[name].recovered > yesterday[name].recovered) {
              today[name].recoveredToday =
                today[name].recovered - yesterday[name].recovered;
            }
          }
        }

        data.data[name] = today[name];
        names.push(name);
      }
    }
  });

  await axios
    .get(
      "https://services6.arcgis.com/BiTAc9ApDDtL9okN/arcgis/rest/services/Statistiques_par_gouvernorat_(nouvelle_donn%C3%A9e)/FeatureServer/0/query?f=json&where=(Nb_cas%3E-1)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Nb_cas%20desc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
    )
    .then((res) => {
      const info = res.data.features;
      dataStates["Tunisia"] = [];
      let all = 0;
      for (i in info) {
        const a = info[i].attributes;
        const name = a.gouvernora.match(/(.*)\s+\-\s+(.*)/);
        dataStates["Tunisia"].push({
          name: [name[2], name[1]],
          cases: a.Nb_cas,
          deaths: a.Nb_deces,
          recovered: a.Nb_retablis,
        });
        all += a.Nb_cas;
      }
      console.log("Tunisia fetched :", all);
    });

  names.sort();
  countriesData.countriesNames = names;

  if (updating) console.log("Updated");
  else console.log("Fetched");

  data.api.updated = true;
  data.api.last_update = new Date().getTime();
  data.api.next_update = new Date().getTime() + 900000;
};

module.exports.data = data;
module.exports.dataStates = dataStates;
module.exports.countriesData = countriesData;

module.exports.fetchData = async () => {
  await fetchData(false);
};

module.exports.updateData = async () => {
  await fetchData(true);
};
