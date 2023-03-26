import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ChampionTable = () => {
  const [championArray, setChampionArray] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  //Id is name so the config by default is to sort by alphabetical
  const [sortConfig, setSortConfig] = useState({ key: "id", dir: "ascending" });

  useEffect(() => {
    axios
      .get("lol/allchampions")
      .then((response) => {
        setChampionArray(response.data);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isFetching) {
    return "Loading...";
  }

  console.log("champion array: ", championArray);

  const sortByKey = () => {
    setChampionArray((arr) => [
      ...arr.sort((a, b) => {
        if (sortConfig.key === "key") {
          if (parseInt(a[1][sortConfig.key]) < parseInt(b[1][sortConfig.key])) {
            return sortConfig.dir === "ascending" ? -1 : 1;
          }
          if (parseInt(a[1][sortConfig.key]) > parseInt(b[1][sortConfig.key])) {
            return sortConfig.dir === "ascending" ? 1 : -1;
          }
          return 0;
        } else {
          if (a[1][sortConfig.key] < b[1][sortConfig.key]) {
            return sortConfig.dir === "ascending" ? -1 : 1;
          }
          if (a[1][sortConfig.key] > b[1][sortConfig.key]) {
            return sortConfig.dir === "ascending" ? 1 : -1;
          }
          return 0;
        }
      }),
    ]);
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
          paddingTop: "6em",
          color: "white",
          textAlign: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Typography variant="h2">League of Legends Champions</Typography>
        {/* <div>
        {Object.entries(allChampions.data).map(([key, champion]) => (
          <p>{champion.name}</p>
        ))}
      </div> */}

        <Button
          variant="contained"
          onClick={sortByKey}
          display="flex"
          flexDirection="row"
          sx={{ color: "white" }}
        >
          <Typography variant="h8" sx={{ paddingLeft: "2em" }}>
            Sort By
          </Typography>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sort Metric</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortConfig.key}
              onChange={(e) =>
                setSortConfig({ key: e.target.value, dir: sortConfig.dir })
              }
            >
              <MenuItem value={"key"}>Release Date</MenuItem>
              <MenuItem value={"id"}>Alphabetical</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortConfig.dir}
              onChange={(e) =>
                setSortConfig({ key: sortConfig.key, dir: e.target.value })
              }
            >
              <MenuItem value={"ascending"}>Ascending</MenuItem>
              <MenuItem value={"descending"}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Button>
        {championArray && (
          <ImageList
            sx={{ margin: "auto", width: "80%", height: "auto" }}
            cols={6}
            rowHeight="auto"
          >
            {championArray.map(([key, champion]) => {
              return (
                <ImageListItem key={key}>
                  <Link
                    to={`/allchampions/${champion.id}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/champion/${champion.id}.png`}
                      alt={champion.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={champion.name}
                      subtitle={champion.title}
                      position="below"
                    />
                  </Link>
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </Box>
    </>
  );
};

export default ChampionTable;
