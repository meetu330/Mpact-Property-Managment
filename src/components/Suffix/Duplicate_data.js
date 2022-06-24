import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../src/image/mpact.png";
import loader from "../../../src/image/3.gif";
import loding from "../../../src/image/4.gif";
import Leftside from "../Leftside";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";

class Duplicate_data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      csv: [],
      total: [],
      show: false,
    };
  }

  async componentDidMount() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url =
        "http://localhost/react_app/backend/api/duplicate_data_liisting";
    } else {
      var url =
        "https://mpact.justcodenow.com/react_app/api/duplicate_data_liisting";
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ user: data });
  }

  render() {
    // CSV download code
    var datacsv = this.state.csv;
    const headers = [
      { label: "id", key: "id" },
      { label: "Committee Id", key: "committee_id" },
      { label: "Committee Name", key: "committee_name" },
      { label: "Report Year", key: "report_year" },
      { label: "Report Type", key: "report_type" },
    ];
    //CSV download code end
    const data1 = this.state.user;

    $(".datatable_loader").hide(100);
    $(".dataTable_p").DataTable({
      data: data1,
      scrollX: true,
      lengthMenu: [50, 100, 150, 200],
      pageLength: 50,
      retrieve: true,
      sDom: "lBfrtip",
      stateSave: true,
      buttons: [
        {
          extend: "excel",
        },
        {
          extend: "csv",
        },
      ],
    });

    return (
      <div>
        <div className="flex">
          <Link to="/">
            <div>
              <img className="image home" src={logo} alt="logo" />
            </div>
          </Link>
        </div>
        <div id="layoutSidenav">
          <Leftside />
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className=" txt mb-3 mt-4">Dashboard</h1>
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Duplicate Data Listing
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-bordered dataTable_p"
                      id="dataTable_p"
                      width="99%"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Firstname</th>
                          <th>Lastname</th>
                          <th>Street</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Zipcode</th>
                        </tr>
                      </thead>
                    </table>
                    <img className="datatable_loader" src={loader} alt="logo" />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default Duplicate_data;
