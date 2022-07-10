import React from "react";
import { Typography, Box } from "@mui/material";
const HomePage = () => {
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
      </Box>
    </>
  );
};

export default HomePage;
