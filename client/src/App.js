import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
      <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/recipes" component={Home} />
      </React.Fragment>
  );
}


export default App;
