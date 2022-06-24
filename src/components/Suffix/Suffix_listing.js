import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Leftside from "../Leftside";
import logo from "../../../src/image/mpact.png";
import $ from "jquery";

class Suffix_listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suffix: [],
    };
  }

  async componentDidMount() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/all_suffix_get";
    } else {
      var url = "https://mpact.justcodenow.com/react_app/api/all_suffix_get";
    }
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ suffix: data.data });
  }

  delete(e) {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var del = "http://localhost/react_app/backend/api/delete_suffix";
    } else {
      var del = "https://mpact.justcodenow.com/react_app/api/delete_suffix";
    }
    var iSuffixAbbId = e.target.id;

    const fd = new FormData();
    fd.append("iSuffixAbbId", iSuffixAbbId);
    if (iSuffixAbbId != "undefined") {
      const dataa = axios
        .post(del, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            swal("Data Deleted", res.data.message, "success");
            setTimeout(function () {
              window.location.reload(1);
            }, 2000);
          } else {
            swal("Data Deleted", res.data.message, "error");
          }
        })
        .catch((error) => {});
    }
  }

  render() {
    setTimeout(() => {
      $(".dataTable_suffix").DataTable({
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
    }, 1000);
    var suffix = this.state.suffix;
    console.log(suffix);
    return (
      <>
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
                  <h1 className=" txt mt-4 mb-3">Dashboard</h1>
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Suffix Abbreviation
                      {/* <CSVLink { ...csvReport}><button type="button"   className="btn btn-primary btn-sm house_btn">CSV Export</button></CSVLink> */}
                    </div>
                    <div className="card-body">
                      <div className="col suffix_add">
                        <a
                          href="/suffix/add"
                          className="btn  myBtn"
                        >
                          Add
                        </a>
                      </div>
                      <table
                        className="table table-bordered dataTable_suffix"
                        id="dataTable_p"
                        width="99%"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Suffix Name</th>
                            <th>Abbreviation</th>
                            <th>Postal Abbreviation</th>
                            <th>AddedDate</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {suffix.map((suff, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{suff.vName}</td>
                              <td>{suff.vSuffixName}</td>
                              <td>{suff.vSuffixNameSort}</td>
                              <td>{suff.dtAddedDate}</td>
                              <th>
                                <a href={`/suffix/edit/${suff.iSuffixAbbId}`}>
                                  <button className="btn myBtn">
                                    Edit
                                  </button>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  id={`${suff.iSuffixAbbId}`}
                                  onClick={this.delete}
                                  className="btn  myBtn"
                                >
                                  Delete
                                </button>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Suffix_listing;
