import React, { useState } from "react";
import WorkerDataService from "../services/WorkerService";

const AddWorker = () => {
  const initialWorkerState = {
    id: null,
    name: "",
    photoFile: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
    dniNumber: "",
    deparment: ""
  };
  const [worker, setWorker] = useState(initialWorkerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const saveWorker = () => {
    var data = {
        name: worker.name,
        birthdate: worker.birthdate,
        address: worker.address,
        phone: worker.phone,
        email: worker.email,
        dni: worker.dni,
        deparment: worker.deparment
    };

    var file = worker.photo;

    WorkerDataService.create(data, file)
      .then(response => {
        // setWorker({
        //   id: response.data.id,
        //   name: response.data.name,
        //   photo: response.data.photo,
        //   birthdate: response.data.birthdate,
        //   address: response.data.birthdate,
        //   phone: response.data.birthdate,
        //   email: response.data.birthdate,
        //   dni: response.data.dni,
        //   deparment: response.data.deparment
        // });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newWorker = () => {
    setWorker(initialWorkerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newWorker}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={worker.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="form-control custom-file-input"
                    id="photo"
                    value={worker.photo}
                    onChange={handleInputChange}
                    name="photo"
                  />
                  <label className="custom-file-label" htmlFor="photo">
                    Choose file
                  </label>
                </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="text"
              className="form-control"
              id="birthdate"
              required
              value={worker.birthdate}
              onChange={handleInputChange}
              name="birthdate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={worker.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={worker.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={worker.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dniNumber">DNI number</label>
            <input
              type="text"
              className="form-control"
              id="dniNumber"
              required
              value={worker.dniNumber}
              onChange={handleInputChange}
              name="dniNumber"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deparment">Deparment</label>
            <input
              type="text"
              className="form-control"
              id="deparment"
              required
              value={worker.deparment}
              onChange={handleInputChange}
              name="deparment"
            />
          </div>

          

          <button onClick={saveWorker} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddWorker;
