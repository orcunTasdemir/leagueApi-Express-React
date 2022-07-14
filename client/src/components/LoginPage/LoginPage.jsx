import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/users/refresh", {
        token: user.refreshToken,
      });
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
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer" + data.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      setUser(res.data);
      console.log(user);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>LoginPage</h1>

      <form onSubmit={onSubmit}>
        <h2>Login Below!</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="Submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
