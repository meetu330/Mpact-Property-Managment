import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../src/image/mpact.png";
import loader from "../../src/image/3.gif";
import loding from "../../src/image/4.gif";
import Leftside from "./Leftside";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";
import { CSVLink } from 'react-csv';
import axios from "axios";
import swal from "sweetalert";
import gif from "../../src/image/7.gif";

class Prospecting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      csv_download: [],
      csv_download_count: [],
      total: [],
      show: false,
      Hide : 'CREATE CSV FILE',
    };
  }

  modeldata() {
    this.setState({ show: !this.state.show });
  }
  csv_metch_data = () =>
  {
      this.setState({ Hide: true});
      var answer = window.location.href;
      const answer_array = answer.split("/");
      if (answer_array[2] === "localhost:3000") {
        var url = "http://localhost/react_app/backend/api/without_duplicate_data_get";
      } else {
        var url = "https://mpact.justcodenow.com/backend/api/without_duplicate_data_get";
      }

      const fd = new FormData();
      fd.append("action", "action");

      const dataa = axios
        .post(url, fd)
        .then((res) => {
          if (res.data.Status == 0) {
            this.setState({ Hide: 'CREATE CSV FILE'});
            swal("Created", 'Please Export CSV File ', "success");
            // setTimeout(function () {
            //     window.location.reload(1);
            // },3000);
          }
          else if (res.data.Status == 1) 
          {
            this.csv_metch_data1();
            this.setState({ csv_download_count: res.data.count });
          }
        })
        .catch((error) => {
            setTimeout(function () {
              window.location.reload(1);
            }, 600000);
        });
  }

  csv_metch_data1 = () => {
    this.setState({ Hide: true});
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] === "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/without_duplicate_data_get1";
    } else {
      var url = "https://mpact.justcodenow.com/backend/api/without_duplicate_data_get1";
    }

    const fd = new FormData();
    fd.append("action", "action")

    const dataa = axios
      .post(url, fd)
      .then((res) => {
        if (res.data.Status == 0) 
        {
          this.setState({ Hide: 'CREATE CSV FILE' });
           swal("Created", 'Please Export CSV File ', "success");
          // window.location.reload(1);
        }
        else if (res.data.Status == 1) {
           this.csv_metch_data();
          this.setState({ csv_download_count: res.data.count });
        }
      })
      .catch((error) => {
        setTimeout(function () {
          window.location.reload(1);
        }, 600000);
      });


  }

  async componentDidMount() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/csv_prospective";
      var csv = "http://localhost/react_app/backend/api/csv_download";
    } else {
      var url = "https://mpact.justcodenow.com/backend/api/csv_prospective";
      var csv = "https://mpact.justcodenow.com/backend/api/csv_download";
    }

    const response  = await fetch(url);
    const data      = await response.json();

    const response0 = await fetch(csv);
    const data0     = await response0.json();
    console.log(data0);

    this.setState({ user: data, csv_download: data0.data, csv_download_count : data0.count});
  }

  render() {
    // CSV download code
    var datacsv = this.state.csv_download;
    var csv_download_count = this.state.csv_download_count;
    
  

    const headers = [
      { label: "Id", key: "id" },
      { label: "Contributor firstname", key: "contributor_first_name" },
      { label: "Contributor Lastname", key: "contributor_last_name" },
      { label: "Contributor Street", key: "contributor_street_1" },
      { label: "Contributor City", key: "contributor_city" },
      { label: "Contributor Zip", key: "contributor_zip" },
      
    ];
    console.log("jkjk", headers);

    
    const csvReport = {
      filename: "Prospecting.csv",
      headers: headers,
      data: datacsv,
    };
    //CSV download code end
    const data1 = this.state.user;

    const lenth = this.state.user.length;

    const Hide = this.state.Hide;

  

    $(".datatable_loader").hide(100);
    $(".dataTable_p").DataTable({
      data: data1,
      scrollX: true,
      lengthMenu: [50, 100, 150, 200],
      pageLength: 200,
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
                <h1 className=" txt mt-4">Dashboard</h1>
                <div
                  className="card mb-4"
                >
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Prospecting Data
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <button type="button" onClick={this.csv_metch_data} className="btn  myBtn">
                          {Hide == true ? (
                            <img className="dup_image" src={gif} />
                          ) : (
                            <>{Hide} </>
                          )}
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={this.csv_metch_data} className="btn  myBtn">
                          <b style={{ 'color': 'red' }}>{csv_download_count}</b>
                          </button>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        {
                          csv_download_count > 0 ?
                            <CSVLink {...csvReport}><button type="button" className="btn  myBtn float-right">CSV Export</button></CSVLink>
                          :
                            <button type="button" className="btn  myBtn float-right  d-flex"><i class="fas fa-hand-point-left mr-3"></i>Please Create CSV</button>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-bordered dataTable_p"
                      id="dataTable_p"
                      width="99.5%"
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

export default Prospecting;
