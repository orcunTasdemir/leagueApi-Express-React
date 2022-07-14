import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const PastGames = () => {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  const getPlayerGames = async (e) => {
    axios
      .get("/lol/past5games", {
        params: { username: searchText },
      })
      .then((response) => setGameList(response.data))
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  //   console.log(gameList);

  return (
    <>
      <div
        className="background"
        style={{
          background: "black",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "4em",
          zIndex: "-1", // this is optional
        }}
      ></div>

      <Box
        className="container"
        sx={{
          paddingTop: "4em",
          color: "white",
          textAlign: "left",
        }}
      >
        <h2>Welcome to Game Search</h2>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={getPlayerGames}>Get past games</button>
        {gameList.length !== 0 ? (
          <>
            {gameList.map((game, index) => (
              <>
                <h2 key={index}>Game {index + 1}: </h2>

                <div className="gameInformation">
                  {game.info.participants.map((player, index) => (
                    <p key={index}>
                      PLAYER {index + 1}: {player.summonerName}, KDA:{" "}
                      {player.kills} / {player.deaths} / {player.assists}
                    </p>
                  ))}
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            <p>We don't have data from this player:</p>
          </>
        )}
      </Box>
    </>
  );
};

export default PastGames;
