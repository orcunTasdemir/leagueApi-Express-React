const axios = require("axios");
const express = require("express");
const router = express.Router();

const API_KEY = "RGAPI-078527b2-856e-4fa3-9bf4-ef80b9a2bb14";
const patch = "12.12.1";

router.get("/allchampions/:championId", async (req, res) => {
  const singleChampionData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion/${req.params.championId}.json`
    )
    .then((response) => response.data.data[req.params.championId])
    .catch((error) => console.log(error));
  // All champion data is in this object
  // console.log(allChampionsData);
  res.json(singleChampionData);
  // res.send(
  //   `<script>console.log(${JSON.parse(
  //     CircularJSON.stringify(allChampionsData)
  //   )})</script>`
  // );
});

router.get("/allitems/:itemId", async (req, res) => {
  const singleItemData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item/${req.params.itemId}.json`
    )
    .then((response) => {
      response.data.data[req.params.itemId];
      console.log(response.data.data);
    })
    .catch((error) => console.log(error));
  res.json(singleItemData);
});

router.get("/allitems", async (req, res) => {
  const allItemsData = await axios
    .get(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`)
    .then((response) => response.data.data)
    .catch((error) => console.log(error));

  // console.log(Object.values(allItemsData).length);

  const filteredItems = Object.fromEntries(
    Object.entries(allItemsData).filter(([key, item]) => {
      return (
        item.inStore !== false &&
        item.requiredChampion == null &&
        item.hideFromAll == null
      );
    })
  );
  res.json(filteredItems);
});

router.get("/allchampions", async (req, res) => {
  const allChampionsData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
  // All champion data is in this object
  // console.log(allChampionsData);
  res.json(allChampionsData);
  // res.send(
  //   `<script>console.log(${JSON.parse(
  //     CircularJSON.stringify(allChampionsData)
  //   )})</script>`
  // );
});

const getPlayerPUUID = (playerName) => {
  return axios
    .get(
      "https://na1.api.riotgames.com/lol" +
        "/summoner/v4/summoners/by-name/" +
        playerName +
        "?api_key=" +
        API_KEY
    )
    .then((response) => {
      // console.log(response.data);
      return response.data.puuid;
    })
    .catch((error) => {
      console.log(error);
    });
};

router.get("/past5games", async (req, res) => {
  // const playerName = "Nicolas";
  const playerName = req.query.username;
  console.log(encodeURIComponent(playerName));
  const PUUID = await getPlayerPUUID(encodeURIComponent(playerName));
  const API_CALL =
    "https://americas.api.riotgames.com/lol" +
    "/match/v5/matches/by-puuid/" +
    PUUID +
    "/ids" +
    "?api_key=" +
    API_KEY;

  // get game ids with this api call
  const gameIDs = await axios
    .get(API_CALL)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  // A list of game id strings
  // console.log(gameIDs);

  // get all information about all these games
  var matchDataArray = [];

  for (var i = 0; i < gameIDs.length - 15; i++) {
    const matchID = gameIDs[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com/lol" +
          "/match/v5/matches/" +
          matchID +
          "?api_key=" +
          API_KEY
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });

    matchDataArray.push(matchData);
  }

  res.json(matchDataArray);
});

module.exports = router;
