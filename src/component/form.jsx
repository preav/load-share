import React, { Component } from "react";
import response from "../data.json";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      customerData: []
    };
  }

  componentDidMount() {
    const data = [...response];
    this.setState({ data });
  }

  handleChange = event => {
    console.log(event.target.value);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.data.map(datum => (
            <div key={datum.id}>
              <div className="inputValues">
                <label>Id: </label>
                <input
                  onChange={e => this.handleChange(e)}
                  id={`id_${datum.id}`}
                  type="text"
                  defaultValue={datum.id}
                />
                <label>Status: </label>
                <input
                  onChange={e => this.handleChange(e)}
                  id={`status_${datum.id}`}
                  type="text"
                  defaultValue={datum.status ? "true" : false}
                />
                <label>Name: </label>
                <input
                  onChange={this.handleChange}
                  id={`name_${datum.id}`}
                  type="text"
                  defaultValue={datum.name}
                />
              </div>
              <div className="contactDetails">
                <label>Mobile:</label>
                <input
                  onChange={this.handleChange}
                  type="tel"
                  id={`tel_${datum.id}`}
                  defaultValue={datum.contactDetails.mobile}
                />
                <label>e-mail: </label>
                <input
                  onChange={this.handleChange}
                  type="email"
                  id={`email_${datum.id}`}
                  defaultValue={datum.contactDetails.email}
                />
              </div>
              <div className="inputValues">
                <label>Branches: </label>
                {datum.branches.map((branch, index) => (
                  <input
                    onChange={this.handleChange}
                    key={index}
                    id={`branch_${datum.id}_${index}`}
                    type="text"
                    defaultValue={branch}
                  />
                ))}
              </div>
              <div>
                Customers:
                <div>
                  {datum.customers.map((customer, index) => (
                    <div key={index}>
                      <label>Customer Name: </label>
                      <input
                        onChange={this.handleChange}
                        key={index}
                        id={`customer_${datum.id}_${index}`}
                        type="text"
                        defaultValue={customer.name}
                      />
                      <br />
                      <label>Status:</label>
                      <input
                        onChange={this.handleChange}
                        key={`customerStatus_${index}`}
                        id={`customerStatus_${datum.id}_${index}`}
                        type="text"
                        defaultValue={customer.active ? "true" : "false"}
                      />
                      <br />
                      <label>Services:</label>
                      {customer.services.map((service, index) => (
                        <input
                          onChange={this.handleChange}
                          key={`customerService_${index}`}
                          id={`customerService_${datum.id}_${index}`}
                          type="text"
                          defaultValue={service}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Form;
