import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Typography,
  Box,
  TextField,
  Container,
  Link,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const navigate = useNavigate();
  // const [token, setToken] = useState("");

  axios.defaults.withCredentials = true;

  const refreshToken = async () => {
    try {
      const res = await axios.post("/users/refresh", {
        token: user.refreshToken,
      });
      console.log("refreshtoken.exp: " + user.refreshToken.exp);
      setUser({
        ...user,
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    // do something before every request
    async (config) => {
      console.log({ user });
      console.log(jwt_decode(user.token));

      let currentDate = Date.now();
      const decodedToken = jwt_decode(user.token);
      console.log("decoded token: " + decodedToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer" + data.token;
        console.log("config" + { config });
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("/users/login", {
      email: email,
      password: password,
    });
    console.log(document.cookie);
    console.log({ res });
    navigate("/allchampions");
  };

  return (
    <>
      <div
        className="background"
        style={{
          background: "white",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "4em",
          zIndex: "-1", // this is optional
        }}
      ></div>

      <Container component="main" maxWidth="xs">
        <Box
          className="container"
          sx={{
            paddingTop: "10em",
            color: "black",
          }}
        >
          <Typography variant="h2">Login</Typography>

          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
