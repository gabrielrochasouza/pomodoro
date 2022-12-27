import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import History from "../pages/history";
import Timer from "../pages/timer/timer";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Timer />} />
      <Route path="/history" element={<History />} />
    </Router>
  );
};

export default Routes;
