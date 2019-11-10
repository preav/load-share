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

  handleBranchChange = (event, id) => {
    const updatedValue = event.target.value;
    const dataId = id - 1;
    const arrayIndex = event.target.id.split("")[event.target.id.length - 1];
    const branches = [...this.state.data[dataId].branches];
    branches[arrayIndex] = updatedValue;
    this.setState(prevState => ({
      data: prevState.data.map(el => {
        return el.id === id ? { ...el, branches } : el;
      })
    }));
  };

  handleActiveChange = (event, id, key, index = 0) => {
    const updatedState = event.target.value === "true" ? true : false;
    if (key === "isActive") {
      this.setState(prevState => ({
        data: prevState.data.map(el => {
          return el.id === id ? { ...el, isActive: updatedState } : el;
        })
      }));
    } else {
      const customers = [...this.state.data[id - 1].customers];
      customers[index].active = updatedState;
      this.setState(prevState => ({
        data: prevState.data.map(el => {
          return el.id === id ? { ...el, customers } : el;
        })
      }));
    }
  };

  handleServiceChange = (event, id) => {
    const updatedState = event.target.value;
    const eventIds = event.target.id.split("_");
    const { length } = eventIds;
    const customerNumber = eventIds[length - 2];
    const serviceNumber = eventIds[length - 1];
    const dataId = id - 1;
    const customers = [...this.state.data[dataId].customers];
    customers[customerNumber].services[serviceNumber] = updatedState;
    this.setState(prevState => ({
      data: prevState.data.map(el => {
        return el.id === id ? { ...el, customers } : el;
      })
    }));
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="outer__wrapper">
          {this.state.data.map(datum => (
            <div key={datum.id} className="inner__wrapper">
              <div className="inputValues">
                <div className="inner__id">Id : {datum.id} </div>
                <label>Is Active</label>
                <select
                  onChange={event =>
                    this.handleActiveChange(event, datum.id, "isActive")
                  }
                  defaultValue={datum.isActive}
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
                <div>
                  Name: <span> {datum.name}</span>
                </div>
              </div>
              <div className="contactDetails">
                <div>
                  Mobile: <span> {datum.contactDetails.mobile}</span>
                </div>
                <div>
                  e-mail: <span> {datum.contactDetails.email}</span>
                </div>
              </div>
              <div className="inputValues">
                <label>Branches: </label>
                {datum.branches.map((branch, index) => (
                  <input
                    type="text"
                    onChange={event => this.handleBranchChange(event, datum.id)}
                    key={index}
                    id={`branch_${datum.id}_${index}`}
                    defaultValue={branch}
                  />
                ))}
              </div>
              <div>
                Customers:
                <div>
                  {datum.customers.map((customer, index_outer) => (
                    <div
                      key={`customer_${index_outer}`}
                      className="customer__wrapper"
                    >
                      <div>
                        Customer Name: <span>{customer.name}</span>
                      </div>
                      <label>Status:</label>
                      <select
                        onChange={event =>
                          this.handleActiveChange(
                            event,
                            datum.id,
                            "active",
                            index_outer
                          )
                        }
                        defaultValue={customer.active}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                      <br />
                      <label>Services:</label>
                      {customer.services.map((service, index) => (
                        <input
                          type="text"
                          onChange={event =>
                            this.handleServiceChange(event, datum.id)
                          }
                          key={`customerService_${index}`}
                          id={`customerService_${datum.id}_${index_outer}_${index}`}
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
