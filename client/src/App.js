import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  const getPlayerGames = (e) => {
    axios
      .get("http://localhost:4000/past5games", {
        params: { username: searchText },
      })
      .then((response) => setGameList(response.data))
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Welcome to Game Search</h2>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={getPlayerGames}>Get past games</button>
      </div>
      <div className="body">
        {gameList.length !== 0 ? (
          <>
            {gameList.map((game, index) => (
              <>
                <h2>Game {index + 1}: </h2>

                <div className="gameInformation">
                  {game.info.participants.map((player, index) => (
                    <p>
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
      </div>
    </div>
  );
}

export default App;
