import React, { useState, useEffect } from "react";
import WorkerDataService from "../services/WorkerService";
import { Link } from "react-router-dom";
import noPhoto from '../empty.png';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveWorkers();
  },[]);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveWorkers = () => {
    console.log("fired\n");
    WorkerDataService.getAll()
      .then(response => {
        setWorkers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveWorkers();
    setCurrentWorker(null);
    setCurrentIndex(-1);
  };

  const setActiveWorker = (worker, index) => {
    setCurrentWorker(worker);
    setCurrentIndex(index);
  };

  const removeAllWorkers = () => {
    WorkerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    WorkerDataService.findByName(searchName)
      .then(response => {
        setWorkers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
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
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveWorker(worker, index)}
                key={index}
              >
                {worker.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllWorkers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentWorker ? (
          <div>
            <h4>Worker Details</h4>
            <div>
              <label>
                <img src={currentWorker.photoFile ? currentWorker.photoFile : noPhoto} alt="" width="100px" height="100px"/>
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentWorker.name}
            </div>
            <div>
              <label>
                <strong>Birthdate:</strong>
              </label>{" "}
              {currentWorker.birthdate}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentWorker.address}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentWorker.phone}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentWorker.email}
            </div>
            <div>
              <label>
                <strong>DNI number:</strong>
              </label>{" "}
              {currentWorker.dniNumber}
            </div>
            <div>
              <label>
                <strong>Deparment:</strong>
              </label>{" "}
              {currentWorker.deparment}
            </div>

            <Link
              to={"/workers/" + currentWorker.id}
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
};

export default WorkersList;
