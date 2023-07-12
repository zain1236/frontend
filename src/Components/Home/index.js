import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter as Router,Route,Routes, } from "react-router-dom";
import { AppContext } from "../Context";
import { Dashboard } from "../Dashboard";
import Login from "../Login";
import { Navbar } from "../Navbar";
import Recordings from "../Recordings";

export default function Home() {
  const { userData } = useContext(AppContext);

  return (
    <Router>
      <Routes>
        <Route
          exact path = '/'
          element = {
            userData ? 
            <div>
              <Navbar />
              <Dashboard />
            </div>
            :
            <div>
              <Login />
            </div> 
          }
        />

        <Route
          exact path="/rec"
          element = {
            <div>
              <Navbar />
              <Recordings />
            </div>
          }
          />
      </Routes>
    </Router>
  );
}
