import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  CardActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
const ItemsDetails = () => {
  let data = useLocation();
  console.log(data.state);
  const item = data.state;
  console.log(typeof item.description);
  var itemStats = item.description
    .match(/<stats>(.*?)<\/stats>/g)
    .toString()
    .replace(/<attention>(.*?)<\/attention>/g, "+$1")
    .split(/<\/?[^>]+(>|$)/g)
    .filter((stat) => stat[0] === "+");

  console.log({ itemStats });

  return (
    <>
      <div
        className="background"
        style={{
          background: `black`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "4em",
          zIndex: "-10", // this is optional
        }}
      ></div>

      <Box
        className="container"
        sx={{
          display: "flex",
          margin: "1em 50px 0px 50px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingTop: "8em",
          color: "white",
          textAlign: "left",
        }}
      >
        <Card
          sx={{
            color: "white",
            fontFamily: "inherit",
          }}
        >
          <CardContent sx={{ padding: "0", backgroundColor: "#0b2163" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 34,
                backgroundColor: "#785a28",
                display: "block",
                padding: ".5em 2em .5em 2em",
                boxSizing: "border-box",
              }}
              gutterBottom
            >
              {item.name}
            </Typography>

            <Box
              component="img"
              sx={{
                paddingBottom: "1em",
                display: "block",
                margin: "auto",
                objectFit: "contain",
              }}
              loading="lazy"
              alt="noalt"
              src={`http://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_CURRENT_PATCH}/img/item/${item.image.full}`}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: 26,
                backgroundColor: "#785a28",
                display: "block",
                padding: ".3em 2em .3em 2em",
                boxSizing: "border-box",
                textAlign: "center",
                marginBottom: "0",
              }}
              gutterBottom
            >
              Stats
            </Typography>
            <Box
              sx={{ padding: ".3em 2em .3em 2em", boxSizing: "border-box" }}
              variant="body2"
            >
              <ul>
                {itemStats.map((stat, key) => (
                  <dl key={key}>
                    <dt>{stat}</dt>
                  </dl>
                ))}
              </ul>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
      <p style={{ color: "white" }}>{JSON.stringify(item.description)}</p>
    </>
  );
};

export default ItemsDetails;
