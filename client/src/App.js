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
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/past5games" element={<PastGames />} />
          <Route exact path="/allchampions" element={<ChampionTable />} />
          <Route
            exact
            path="/allchampions/:championId"
            element={<ChampionDetails />}
          />
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
