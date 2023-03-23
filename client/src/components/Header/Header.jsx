import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: { position: "fixed", background: "#2E3B55" },
  toolbar: { background: "#1976D2" },
  navlinks: {
    // marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    // flexGrow: "1",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(2),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar}>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">
          <Link to="/" className={classes.logo}>
            League Api 1.0
          </Link>
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/past5games" className={classes.link}>
            Past Games
          </Link>
          <Link to="/allchampions" className={classes.link}>
            Champions
          </Link>
          <Link to="/allitems" className={classes.link}>
            Items
          </Link>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
