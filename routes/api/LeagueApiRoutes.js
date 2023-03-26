const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/allchampions/:championId", async (req, res) => {
  console.log("champs api end");
  const singleChampionData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${process.env.CURRENT_PATCH}/data/en_US/champion/${req.params.championId}.json`
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

// router.get("/allitems/:itemId", async (req, res) => {
//   console.log(
//     "link" +
//       `http://ddragon.leagueoflegends.com/cdn/${process.env.CURRENT_PATCH}/data/en_US/item/${req.params.itemId}.json`
//   );
//   const singleItemData = await axios
//     .get(
//       `http://ddragon.leagueoflegends.com/cdn/${process.env.CURRENT_PATCH}/data/en_US/item/${req.params.itemId}.json`
//     )
//     .then((response) => response) //data.data[req.params.itemId]
//     .catch((error) => console.log(error));
//   res.json(singleItemData);
// });

router.get("/allitems", async (req, res) => {
  const allItemsData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${process.env.CURRENT_PATCH}/data/en_US/item.json`
    )
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

router.get("/ladder/:queue/:tier/:division", async (req, res) => {
  const queue = req.params.queue;
  const tier = req.params.tier;
  const division = req.params.division;
  const page = req.query.page;

  const API_CALL =
    "https://na1.api.riotgames.com/lol/league/v4/entries/" +
    queue +
    "/" +
    tier +
    "/" +
    division +
    "?+page=" +
    page +
    "&api_key=" +
    process.env.API_KEY;

  const ladderData = await axios
    .get(API_CALL)
    .then((response) =>
      response.data.sort((a, b) => b.leaguePoints - a.leaguePoints)
    )
    .catch((err) => console.log(err));

  res.json(ladderData);
});

router.get("/allchampions", async (req, res) => {
  const allChampionsData = await axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/${process.env.CURRENT_PATCH}/data/en_US/champion.json`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
  // All champion data is in this object
  // console.log(allChampionsData);
  res.json(Object.entries(allChampionsData.data));
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
        process.env.API_KEY
    )
    .then((response) => {
      // console.log(response.data);
      return response.data.puuid;
    })
    .catch((error) => {
      console.log(error);
    });
};
router.get("/summonerInfo/:summonerName", async (req, res) => {
  const summonerName = req.params.summonerName;
  const API_CALL =
    "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
    summonerName +
    "?api_key=" +
    process.env.API_KEY;
  const summonerInfo = await axios
    .get(API_CALL)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.json(summonerInfo);
});

router.get("/past5games/:matchId", async (req, res) => {
  console.log("calling game info api");
  const API_CALL =
    "https://americas.api.riotgames.com/lol" +
    "/match/v5/matches/" +
    req.params.matchId +
    "?api_key=" +
    process.env.API_KEY;
  const gameInfo = await axios
    .get(API_CALL)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  res.json(gameInfo);
});

router.get("/past5games", async (req, res) => {
  const playerName = req.query.username;
  console.log("username: ", playerName);
  const numberOfGames = req.query.numberOfGames || 5;
  console.log("numberOfGames: ", numberOfGames);
  // console.log(encodeURIComponent(playerName));
  const PUUID = await getPlayerPUUID(encodeURIComponent(playerName));
  const API_CALL =
    "https://americas.api.riotgames.com/lol" +
    "/match/v5/matches/by-puuid/" +
    PUUID +
    "/ids" +
    "?api_key=" +
    process.env.API_KEY;

  // get game ids with this api call
  const gameIDs = await axios
    .get(API_CALL)
    .then((response) => {
      console.log("response occur: ", response);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "error occured, either the api key is wrong or the user does not exist",
        error
      );
    });

  // A list of game id strings
  // console.log(gameIDs);

  //means this player either doesnt exist or didnt play any games
  //which is the same thing for me at this point
  console.log(typeof gameIDs);
  console.log(gameIDs);
  if (gameIDs === undefined) {
    return res.json({
      message: `No player found with username: ${playerName}`,
    });
  }

  // get all information about all these games
  var matchDataArray = [];

  for (var i = 0; i < gameIDs.length - (20 - numberOfGames); i++) {
    const matchID = gameIDs[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com/lol" +
          "/match/v5/matches/" +
          matchID +
          "?api_key=" +
          process.env.API_KEY
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });

    matchDataArray.push(matchData);
  }

  res.json({ matches: matchDataArray });
});

module.exports = router;
