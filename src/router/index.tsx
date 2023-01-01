import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Timer from "../pages/timer/timer";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Timer />} />
    </Router>
  );
};

export default Routes;
