import React from "react";
import WorkerDataService from "../services/WorkerService";
import { Link } from "react-router-dom";
import noPhoto from '../empty.png';

class WorkersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      currentWorker: null,
      currentIndex: -1,
      searchName: ""
    }

    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.setActiveWorker = this.setActiveWorker.bind(this);
    this.removeAllWorkers = this.removeAllWorkers.bind(this);
    this.findByName = this.findByName.bind(this);

  }

  componentDidMount() {
    this.retrieveWorkers();
  }

  componentWillUnmount () {
    WorkerDataService.cancel();
  }

  onChangeSearchName(e) {
    this.setState({searchName: e.target.value});
  }

  retrieveWorkers() {
    WorkerDataService.getAll()
      .then(response => {
        this.setState({workers: response.data, loading: false});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWorkers();
    this.serActiveWorker(null, -1);
  }

  setActiveWorker(worker, idx) {
    this.setState({
      currentWorker: worker,
      currentIndex: idx
    });
  }

  removeAllWorkers() {
    WorkerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  findByName() {
    WorkerDataService.findByName(searchName)
      .then(response => {
        this.setState({workers: response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const workers = this.state.workers;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={this.searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Workers List</h4>
  
          <ul className="list-group">
            {workers && workers.map((worker, index) => (
                <li
                  className={
                    "list-group-item " + (index === this.state.currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWorker(worker, index)}
                  key={worker.dniNumber}
                >
                  {worker.name}
                </li>
              ))}
          </ul>
  
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllWorkers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {this.state.currentWorker ? (
            <div>
              <h4>Worker Details</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {this.state.currentWorker.name}
              </div>
              <div>
                <label>
                  <strong>Birthdate:</strong>
                </label>{" "}
                {this.state.currentWorker.birthdate}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {this.state.currentWorker.address}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {this.state.currentWorker.phone}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {this.state.currentWorker.email}
              </div>
              <div>
                <label>
                  <strong>DNI number:</strong>
                </label>{" "}
                {this.state.currentWorker.dniNumber}
              </div>
              <div>
                <label>
                  <strong>Deparment:</strong>
                </label>{" "}
                {this.state.currentWorker.deparment}
              </div>
  
              <Link
                to={"/workers/" + this.state.currentWorker.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Worker...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default WorkersList;
