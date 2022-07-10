import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  List,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import {
  GiSwordsEmblem,
  GiHeavyArrow,
  GiStoneTower,
  GiHood,
  GiAngelOutfit,
  GiSpinningSword,
  GiEdgedShield,
  GiWizardStaff,
  GiStairs,
} from "react-icons/gi";

import { FaCircle } from "react-icons/fa";

const ChampionDetails = ({ allChampions }) => {
  const { championId } = useParams();

  const [champion, setChampion] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const tagsDict = {
    Fighter: <GiSwordsEmblem />,
    Tank: <GiStoneTower />,
    Support: <GiAngelOutfit />,
    Mage: <GiWizardStaff />,
    Marksman: <GiHeavyArrow />,
  };

  const generalStats = {
    attack: <GiSpinningSword />,
    defense: <GiEdgedShield />,
    magic: <GiWizardStaff />,
    difficulty: <GiStairs />,
  };

  // console.log(`${process.env.REACT_APP_SERVER_URL}/allchampions/${championId}`);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/allchampions/${championId}`)
      .then((response) => {
        setChampion(response.data);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isFetching) return "Loading...";

  const splashURL = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
  const abilityURL = `http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/FlashFrost.png`;
  return (
    <>
      <div
        className="background"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${splashURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed",
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
        <h1 style={{ paddingLeft: "50px", marginTop: "1em" }}>
          {champion.name}: {champion.title}
        </h1>

        <Box sx={{ display: "flex", margin: "1em 50px 0px 50px" }}>
          <Box sx={{ flex: "4" }}>
            <Box>
              <Typography variant="h4" sx={{ paddingBottom: ".5em" }}>
                Lore
              </Typography>
              <Typography
                sx={{
                  width: "525px",
                  paddingRight: "25px",
                }}
              >
                {champion.lore}
              </Typography>
            </Box>

            <Box sx={{ paddingTop: "25px" }}>
              <Typography variant="h4" sx={{ paddingBottom: ".5em" }}>
                GamePlay
              </Typography>
              <Typography variant="h5">Roles</Typography>
              <List>
                {champion.tags.map((tag) => (
                  <Typography variant="h6">
                    {tagsDict[tag]}
                    <span style={{ paddingRight: "10px" }}></span>
                    {tag}
                  </Typography>
                ))}
              </List>
              <Typography variant="h5" sx={{ paddingTop: "10px" }}>
                General Stats
              </Typography>
              <List>
                {Object.entries(champion.info).map(([key, value]) => (
                  <Typography variant="h6">
                    {generalStats[key]}
                    <span style={{ paddingRight: "10px" }}></span>
                    {Array(value)
                      .fill()
                      .map((x) => (
                        <FaCircle style={{ padding: "0.2em" }} />
                      ))}
                  </Typography>
                ))}
              </List>
            </Box>
          </Box>
          <Box sx={{ flex: "8" }}>
            <Typography variant="h4" sx={{ paddingBottom: ".5em" }}>
              All Skins
            </Typography>
            <ImageList
              sx={{
                margin: "auto",
                maxHeight: "510px",
              }}
              cols={3}
              rowHeight="auto"
            >
              {champion.skins.map(({ num, name, chromas }) => (
                <ImageListItem key={num}>
                  {/* <Link to={`/allchampions/${champion.id}`}> */}
                  <img
                    style={{ objectFit: "contain" }}
                    src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${num}.jpg`}
                    alt={`${champion.title} skin number: ${num}`}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={name}
                    subtitle={chromas ? "has chromas" : "does not have chromas"}
                    position="below"
                  />
                  {/* </Link> */}
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        <Box sx={{ marginTop: "2em" }}>
          <Typography variant="h5">Skills</Typography>
          <Box>
            {champion.spells.map(({ id, name }) => (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${id}.png`}
                alt={`Champion spell named: ${name}`}
              ></img>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChampionDetails;
