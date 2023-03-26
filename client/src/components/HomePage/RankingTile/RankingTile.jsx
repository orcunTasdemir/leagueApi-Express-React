import { React, useState, useEffect } from "react";
import { Typography, TableRow, TableCell } from "@mui/material";
import axios from "axios";

const RankingTile = ({ summoner, index }) => {
  const [iconURL, setIconURL] = useState("");

  useEffect(() => {
    axios
      .get(`/lol/summonerInfo/${summoner.summonerName}`)
      .then((response) =>
        setIconURL(
          `https://ddragon.leagueoflegends.com/cdn/${
            process.env.REACT_APP_CURRENT_PATCH
          }/img/profileicon/${response.data.profileIconId.toString()}.png`
        )
      )
      .catch((err) => console.log(err));
  });

  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          maxHeight: "50px",
        }}
      >
        <TableCell>
          <Typography variant="h6">{index}</Typography>
        </TableCell>
        <TableCell>
          <img
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
            }}
            src={iconURL}
            alt={summoner.summonerName}
            loading="lazy"
          />
          <Typography variant="h6">{summoner.summonerName}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{summoner.leaguePoints}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">
            {(
              (summoner.wins / (summoner.wins + summoner.losses)) *
              100
            ).toFixed(2) + "%"}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RankingTile;
