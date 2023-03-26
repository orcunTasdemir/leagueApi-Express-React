import { React, useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import RankingTile from "./RankingTile/RankingTile";

const HomePage = () => {
  const [queue, setQueue] = useState("");
  const [tier, setTier] = useState("");
  const [division, setDivision] = useState("");
  const [page, setPage] = useState("2");
  const [ladderData, setLadderData] = useState([]);

  const getLadderData = async () => {
    await axios
      .get(`/lol/ladder/${queue}/${tier}/${division}`, {
        params: { page: page },
      })
      .then((response) => setLadderData(response.data))
      .catch((err) => console.log(err));
  };

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
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "4em",
          color: "white",
          textAlign: "left",
        }}
      >
        <Typography variant="h1">Homepage</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Queue</InputLabel>
          <Select
            sx={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={queue}
            label="queue"
            onChange={(e) => setQueue(e.target.value)}
          >
            <MenuItem value={"RANKED_SOLO_5x5"}>RANKED_SOLO_5x5</MenuItem>
            <MenuItem value={"RANKED_FLEX_SR"}>RANKED_FLEX_SR</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Tier</InputLabel>
          <Select
            sx={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tier}
            label="tier"
            onChange={(e) => setTier(e.target.value)}
          >
            <MenuItem value={"IRON"}>IRON</MenuItem>
            <MenuItem value={"BRONZE"}>BRONZE</MenuItem>
            <MenuItem value={"SILVER"}>SILVER</MenuItem>
            <MenuItem value={"GOLD"}>GOLD</MenuItem>
            <MenuItem value={"PLATINUM"}>PLATINUM</MenuItem>
            <MenuItem value={"DIAMOND"}>DIAMOND</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Division</InputLabel>
          <Select
            sx={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={division}
            label="division"
            onChange={(e) => setDivision(e.target.value)}
          >
            <MenuItem value={"I"}>I</MenuItem>
            <MenuItem value={"II"}>II</MenuItem>
            <MenuItem value={"III"}>III</MenuItem>
            <MenuItem value={"IV"}>IV</MenuItem>
          </Select>
          <Button type="submit" variant="contained" onClick={getLadderData}>
            Submit
          </Button>
        </FormControl>

        {ladderData.length !== 0 ? (
          <>
            <Table sx={{ maxWidth: 800, backgroundColor: "white" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Rank#</TableCell>
                  <TableCell align="left">SummonerName</TableCell>
                  <TableCell align="left">LP</TableCell>
                  <TableCell align="left">Wins%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ladderData.map((summoner, index) => (
                  <div>
                    <RankingTile summoner={summoner} index={index} />
                  </div>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <Typography variant="h3">No ladder data to show!</Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default HomePage;
