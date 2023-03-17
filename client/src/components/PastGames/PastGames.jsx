import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Input,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableClass: {
    img: {
      width: "10px",
      height: "10px",
      objectFit: "contain",
    },
  },
}));

const PastGames = () => {
  const classes = useStyles();

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

  // function createData(championImage, allFinalItems, KDA) {
  //   return { championImage, allFinalItems, KDA };
  // }

  const toGameDuration = (fourDigits) => {
    return "fourDigits[0,2";
  };

  const items = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"];

  console.log(gameList);

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
          paddingTop: "6em",
          color: "white",
          textAlign: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Typography variant="h2">Welcome to Game Search</Typography>
        <Typography variant="h4" sx={{ paddingTop: "2em" }}>
          Search for past games
        </Typography>
        <Input
          type="text"
          sx={{ input: { color: "white", outlineColor: "red" } }}
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
        <Button onClick={getPlayerGames}>Get past games</Button>
        {gameList.length !== 0 ? (
          <>
            {gameList.map((game, index) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h2" key={index}>
                    Game {index + 1}:
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h4">
                      Mode: {game.info.gameMode}
                      {"   "}
                    </Typography>
                    <Typography variant="h4">
                      Duration: {toGameDuration(game.info.gameDuration)}
                    </Typography>
                  </Box>
                </Box>

                <TableContainer
                  component={Paper}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  {/* First Team table */}
                  <Table
                    className={classes.tableClass}
                    sx={{ maxWidth: 800, maxHeight: 100 }}
                    // aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Champion</TableCell>
                        <TableCell align="left">SummonerName</TableCell>
                        <TableCell align="left">Items</TableCell>
                        <TableCell align="left">KDA</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {game.info.participants
                        .slice(0, 5)
                        .map((player, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              maxHeight: "50px",
                            }}
                          >
                            <TableCell key={index}>
                              <img
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                }}
                                src={`https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/champion/${player.championName}.png`}
                                alt={player.championName}
                                loading="lazy"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {player.summonerName}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              {items.map((item) => {
                                if (player[item] !== 0) {
                                  return (
                                    <img
                                      style={{
                                        maxWidth: "30px",
                                        maxHeight: "30px",
                                        objectFit: "contain",
                                      }}
                                      src={`http://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/item/${player[item]}.png`}
                                      alt={`The item: ${player[item]}`}
                                    />
                                  );
                                }
                              })}
                            </TableCell>

                            <TableCell>
                              {player.kills} / {player.deaths} /{" "}
                              {player.assists}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Second Team table */}
                  <Table
                    className={classes.tableClass}
                    sx={{ maxWidth: 800, maxHeight: 100 }}
                    // aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Champion</TableCell>
                        <TableCell align="left">SummonerName</TableCell>
                        <TableCell align="left">Items</TableCell>
                        <TableCell align="left">KDA</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {game.info.participants
                        .slice(5, 10)
                        .map((player, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              maxHeight: "50px",
                            }}
                          >
                            <TableCell key={index}>
                              <img
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                }}
                                src={`https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/champion/${player.championName}.png`}
                                alt={player.championName}
                                loading="lazy"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">
                                {player.summonerName}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              {items.map((item) => {
                                if (player[item] !== 0) {
                                  return (
                                    <img
                                      style={{
                                        maxWidth: "30px",
                                        maxHeight: "30px",
                                        objectFit: "contain",
                                      }}
                                      src={`http://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/item/${player[item]}.png`}
                                      alt={`The item: ${player[item]}`}
                                    />
                                  );
                                }
                              })}
                            </TableCell>

                            <TableCell>
                              {player.kills} / {player.deaths} /{" "}
                              {player.assists}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
