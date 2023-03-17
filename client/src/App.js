import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChampionTable,
  ChampionDetails,
  Header,
  PastGames,
  HomePage,
  Items,
  LoginPage,
  AdminPage,
  ItemsDetails,
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/admin"
            element={<AdminPage user={user} setUser={setUser} />}
          />

          <Route
            exact
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
          />

          <Route exact path="/past5games" element={<PastGames />} />
          <Route exact path="/allchampions" element={<ChampionTable />} />
          <Route exact path="/allitems" element={<Items />} />

          <Route
            exact
            path="/allchampions/:championId"
            element={<ChampionDetails />}
          />
          <Route exact path="/allitems/:itemId" element={<ItemsDetails />} />
        </Routes>
      </Router>
      {/* <div className="header">
        <h2>Welcome to Game Search</h2>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={getPlayerGames}>Get past games</button>
      </div> */}
      <div className="body"></div>
    </div>
  );
}

export default App;
