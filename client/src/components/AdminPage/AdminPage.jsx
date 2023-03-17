import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const AdminPage = ({ user }) => {
  const [usersData, setUsersData] = useState([]);
  console.log(document.cookie.split("=")[1]);

  useEffect(() => {
    axios
      .get("/admin/allusers", {
        headers: { authorization: "Bearer " + document.cookie.split("=")[1] },
      })
      .then((response) => {
        // console.log({ response });
        setUsersData(response.data);
      })
      .catch((err) => console.log("Error is here in admin react:", err));
  }, [user]);

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
          paddingTop: "4em",
          color: "white",
          textAlign: "left",
        }}
      >
        <Typography variant="h4">Admin Page</Typography>
        <Typography variant="h5">All Users</Typography>
        <ul>
          {usersData.map((user, key) => (
            <dl key={key}>
              <dt>{user.username}</dt>
              <dd>{user.email}</dd>
              <dd>{user._id}</dd>
            </dl>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default AdminPage;
