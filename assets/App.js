import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddWorker from "./components/AddWorker";
import Worker from "./components/Worker";
import WorkerList from "./components/WorkerList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/workers" className="navbar-brand">
            Enterprise-X
          </a>
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
            <Route exact path={["/", "/workers"]} component={WorkerList} />
            <Route exact path="/add" component={AddWorker} />
            <Route path="/workers/:id" component={Worker} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
