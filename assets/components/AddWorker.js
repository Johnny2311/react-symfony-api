import React from "react";
import WorkerDataService from "../services/WorkerService";

class AddWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: {
        id: null,
        name: "",
        birthdate: "",
        address: "",
        phone: "",
        email: "",
        dniNumber: "",
        deparment: ""
      },
      submitted: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveWorker = this.saveWorker.bind(this);
    this.newWorker = this.newWorker.bind(this);
    
  }

  handleInputChange(event) {
    this.setState({worker: {...this.state.worker, [event.target.name]: event.target.value}});
  }

  saveWorker() {
    WorkerDataService.create(this.state.worker)
      .then(response => {
        this.setState({submitted: true});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWorker() {
    this.setState({
      worker: {
        id: null,
        name: "",
        birthdate: "",
        address: "",
        phone: "",
        email: "",
        dniNumber: "",
        deparment: ""
      },
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWorker}>
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
                value={this.state.worker.name}                
                name="name"
                onChange={this.handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="text"
                className="form-control"
                id="birthdate"
                required
                value={this.state.worker.birthdate}
                name="birthdate"
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.worker.address}
                name="address"
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={this.state.worker.phone}
                name="phone"
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.worker.email}
                name="email"
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="dniNumber">DNI number</label>
              <input
                type="text"
                className="form-control"
                id="dniNumber"
                required
                value={this.state.worker.dniNumber}
                name="dniNumber"
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="deparment">Deparment</label>
              <input
                type="text"
                className="form-control"
                id="deparment"
                required
                value={this.state.worker.deparment}
                name="deparment"
                onChange={this.handleInputChange}
              />
            </div>
  
            <button onClick={this.saveWorker} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}

export default AddWorker;
