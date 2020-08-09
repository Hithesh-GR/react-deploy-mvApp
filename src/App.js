import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import favourites from "../src/components/favPage";
import search from "../src/components/search";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route path="/search" component={search}></Route>
            <Route path="/react-deploy-mvApp" component={search}></Route>
            <Route path="/" exact component={search}></Route>
            <Route path="/favourites" component={favourites}></Route>
          </div>
        </Router>
      </div>
    );
  }
}
