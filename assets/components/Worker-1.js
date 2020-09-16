import React, { useState, useEffect } from "react";
import WorkerDataService from "../services/WorkerService";

const Worker = props => {
  const initialWorkerState = {
    id: undefined,
    name: "",
    photoFile: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
    dniNumber: "",
    deparment: ""
  };
  const [currentWorker, setCurrentWorker] = useState(initialWorkerState);
  const [message, setMessage] = useState("");

  const getWorker = id => {
    WorkerDataService.get(id)
      .then(response => {
        setCurrentWorker(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getWorker(props.match.params.id);
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentWorker({ ...currentWorker, [name]: value });
  };



  const updateWorker = () => {

    var data = {
      name: currentWorker.name,
      birthdate: currentWorker.birthdate,
      address: currentWorker.address,
      phone: currentWorker.phone,
      email: currentWorker.email,
      dniNumber: currentWorker.dniNumber,
      deparment: currentWorker.deparment
    };

    var file = currentWorker.photo;

    WorkerDataService.update(currentWorker.id, data, file)
      .then(response => {
        console.log(response.data);
        setMessage("The worker was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteWorker = () => {
    WorkerDataService.remove(currentWorker.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/workers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentWorker ? (
        <div className="edit-form">
          <h4>Worker</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentWorker.name}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="photoFile">Photo</label>
              <input
                type="file"
                className="form-control"
                id="photoFile"
                name="photoFile"
                value={currentWorker.photoFile}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="text"
                className="form-control"
                id="birthdate"
                name="birthdate"
                value={currentWorker.birthdate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={currentWorker.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={currentWorker.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentWorker.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dniNumber">DNI number</label>
              <input
                type="text"
                className="form-control"
                id="dniNumber"
                name="dniNumber"
                value={currentWorker.dniNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deparment">Deparment</label>
              <input
                type="text"
                className="form-control"
                id="deparment"
                name="deparment"
                value={currentWorker.deparment}
                onChange={handleInputChange}
              />
            </div>

            
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteWorker}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateWorker}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Worker...</p>
        </div>
      )}
    </div>
  );
};

export default Worker;
