import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import ReactGA from "react-ga";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
//@ts-ignore
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Suspense fallback={<div>Loading... </div>}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
