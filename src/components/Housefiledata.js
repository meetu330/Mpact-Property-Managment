import React from "react";
import { CSVLink } from "react-csv";
import { Link, Redirect } from "react-router-dom";
import Table from "./Table";
import logo from "../../src/image/mpact.png";
import Leftside from "./Leftside";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";
import "datatables.net-buttons/js/buttons.html5";

class Housefiledata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      csv: [],
      CsvId: [],
      value: "",
      // total: [],
    };
  }

  async componentDidMount() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/csv_all";
      var csv = "http://localhost/react_app/backend/api/csv";
    } else {
      var url = "https://mpact.justcodenow.com/backend/api/csv_all";
      var csv = "https://mpact.justcodenow.com/backend/api/csv";
    }

    const response = await fetch(url);
    const data = await response.json();

    const response0 = await fetch(csv);
    const data0 = await response0.json();

    this.setState({ user: data, csv: data0.data });

    // var table = $('.dataTable').DataTable();

    // $(".dataTable").DataTable().ajax.reload();

    $(".dataTable").DataTable({
      data: data,
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
  }
  search_value = (e) => {
    console.log(e.target.value);
  };

  render() {
    // CSV download code
    var datacsv = this.state.csv;
    var iCsvId = this.state.CsvId;

    const headers = [
      { label: "id", key: "id" },
      { label: "FirstName", key: "vFirstName" },
      { label: "Lastname", key: "vLastname" },
      { label: "Street", key: "vStreet" },
      { label: "State", key: "vState" },
      { label: "Addeddate", key: "dtAddeddate" },
    ];
    const csvReport = {
      filename: "HouseFile.csv",
      headers: headers,
      data: datacsv,
    };
    //CSV download code end

    $(".datatable_loader").hide(100);

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
                <h1 className=" txt mt-4">Dashboard</h1>
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Housefile Data
                  </div>
                  <div className="card-body">{<Table />}</div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Housefiledata;
$(document).ready(function () {
  $(document).on("keyup", "input", function () {
    $(".keyword").val($(this).val());
  });
});
