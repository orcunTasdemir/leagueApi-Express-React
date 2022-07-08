var express = require("express");
var cors = require("cors");
const axios = require("axios");

var app = express();

app.use(cors());

const API_KEY = "RGAPI-e90ce9dc-3d64-4a39-a84d-22ef4f285c53";

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
      console.log(response.data);
      return response.data.puuid;
    })
    .catch((error) => {
      console.log(error);
    });
};

app.get("/past5games", async (req, res) => {
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
  console.log(gameIDs);

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

app.listen(4000, () => {
  console.log("The server is listening on port 4000!");
});
