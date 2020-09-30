import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddWorker from "./components/AddWorker";
import Worker from "./components/Worker";
import WorkerList from "./components/WorkerList";

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Enterprise-X
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/workers"} className="nav-link">
                Workers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/workers"} component={WorkerList} />
            <Route exact path="/add" component={AddWorker} />
            <Route exact path="/workers/:id" component={Worker} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
