import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";

const ChampionTable = () => {
  const [allChampions, setAllChampions] = useState({ allChampions: [] });
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/allchampions`)
      .then((response) => {
        setAllChampions(response.data);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isFetching) return "Loading...";

  const championArray = Object.entries(allChampions.data);

  return (
    <div style={{ background: "black" }}>
      <h1>League of Legends Champions</h1>
      {/* <div>
        {Object.entries(allChampions.data).map(([key, champion]) => (
          <p>{champion.name}</p>
        ))}
      </div> */}
      {championArray && (
        <ImageList
          sx={{ margin: "auto", width: "80%", height: "auto" }}
          cols={6}
          rowHeight="auto"
        >
          {championArray.map(([key, champion]) => (
            <ImageListItem key={key}>
              <Link to={`/allchampions/${champion.id}`}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/${champion.id}.png`}
                  alt={champion.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    color: "white",
                  }}
                  title={champion.name}
                  subtitle={champion.title}
                  position="below"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default ChampionTable;
