import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableClass: {
    img: {
      width: "10px",
      height: "10px",
      objectFit: "contain",
    },
  },
  select: {
    "& .MuiSvgIcon-root": {
      color: "#1976D2",
    },
  },
}));

const PastGames = () => {
  const classes = useStyles();

  const [serverMessage, setServerMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);
  const [numberOfGames, setNumberOfGames] = useState(5);

  useEffect(() => {
    //if gamelist changes, set localstorage to gameList
    //if (gameList.length > 0) {
    localStorage.setItem("gameList", JSON.stringify(gameList));
    //}
  }, [gameList]);

  useEffect(() => {
    const data = window.localStorage.getItem("gameList");
    if (data !== null) {
      const data2 = JSON.parse(data);
      setGameList(data2);
      console.log("does refresh code");
    }
  }, []);

  const getPlayerGames = async () => {
    const params = { username: searchText, numberOfGames: numberOfGames };
    await axios
      .get("/lol/past5games", {
        params: params,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setGameList([]);
          setServerMessage(response.data.message);
        } else {
          setGameList(response.data.matches);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const options = [5, 10, 15, 20];

  const GameNumberSelector = () => {
    return (
      <>
        <FormControl sx={{ width: "6em" }}>
          <InputLabel id="number-of-games-select">Number</InputLabel>
          <Select
            className={classes.select}
            sx={{ fontSize: "2.125rem", color: "white", paddingRight: "0em" }}
            labelId="number-of-games-select"
            id="number-of-games-select"
            value={numberOfGames}
            label="number-of-games-select"
            onChange={(e) => {
              setNumberOfGames(e.target.value);
            }}
          >
            {options.map((value, key) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </>
    );
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "2em",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Search for past</Typography>
          <GameNumberSelector />
          <Typography sx={{ paddingRight: "1em" }} variant="h4">
            games for
          </Typography>

          <Input
            type="text"
            sx={{
              width: "15em",
              input: {
                fontSize: "2.125rem",
                color: "white",
                outlineColor: "#1976D2",
              },
            }}
            onChange={(e) => setSearchText(e.target.value)}
          ></Input>
          <Button
            variant="contained"
            sx={{ marginLeft: "2em" }}
            onClick={getPlayerGames}
          >
            Get past {numberOfGames} games
          </Button>
        </Box>

        {gameList.length !== 0 ? (
          <>
            {console.log({ gameList })}
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
                    <Link
                      to={`/past5games/${game.metadata.matchId}`}
                      state={game.metadata.matchId}
                    >
                      <Button> Go to details Page</Button>
                    </Link>
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
            <Typography variant="h2">{serverMessage}</Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default PastGames;
