import { useLocation, useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableSortLabel,
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
import axios from "axios";
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

const GamePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [isLoading, setLoading] = useState(true);

  const items = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"];

  const classes = useStyles();

  let matchId = useLocation().state;
  console.log(matchId);
  const [game, setGame] = useState();

  useEffect(() => {
    axios
      .get(`/lol/past5games/${matchId}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(game.info);
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
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={goBack}>
              Back to Games List
            </Button>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h4">
                Duration:{" "}
                {(game.info.participants[0].challenges.gameLength / 60).toFixed(
                  2
                )}
              </Typography>

              <Typography variant="h4">Mode: {game.info.gameMode}</Typography>
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
                {game.info.participants.slice(0, 5).map((player, index) => (
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
                      {player.kills} / {player.deaths} / {player.assists}
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
                {game.info.participants.slice(5, 10).map((player, index) => (
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
                      {player.kills} / {player.deaths} / {player.assists}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Box>
    </>
  );
};

export default GamePage;
