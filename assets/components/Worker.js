import React from "react";
import WorkerDataService from "../services/WorkerService";


class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      name: "",
      birthdate: "",
      address: "",
      phone: "",
      email: "",
      dniNumber: "",
      deparment: ""
    };

    this.getWorker = this.getWorker.bind(this);
    this.updateWoker = this.updateWorker.bind(this);
    this.deleteWorker = this.getWorker.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    this.getWorker(this.props.match.params.id);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getWorker(id) {
    WorkerDataService.get(id)
      .then(response => {
        this.setState(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWorker() {
    var data = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
      dniNumber: this.state.dniNumber,
      deparment: this.state.deparment
    };

    WorkerDataService.update(this.state.id, data)
      .then(response => {
        console.log(response.data);
        alert("The worker was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWorker() {
    WorkerDataService.remove(this.state.id)
      .then(response => {
        console.log(response.data);
        alert("The worker was deleted successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
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
                  value={this.state.name}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthdate">Birthdate</label>
                <input
                  type="text"
                  className="form-control"
                  id="birthdate"
                  name="birthdate"
                  value={this.state.birthdate}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dniNumber">DNI number</label>
                <input
                  type="text"
                  className="form-control"
                  id="dniNumber"
                  name="dniNumber"
                  value={this.state.dniNumber}
                  onChange={this.handleClick}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deparment">Deparment</label>
                <input
                  type="text"
                  className="form-control"
                  id="deparment"
                  name="deparment"
                  value={this.state.deparment}
                  onChange={this.handleClick}
                />
              </div>
  
              
            </form>
  
            <button className="badge badge-danger mr-2" onClick={this.deleteWorker}>
              Delete
            </button>
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateWorker}
            >
              Update
            </button>
          </div>
      </div>
    );
  }

}

export default Worker;
