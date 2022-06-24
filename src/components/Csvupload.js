import React from "react";
import { Redirect } from "react-router-dom";
import { InputGroup, FormControl, Form, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import logo from "../../src/image/mpact.png";
import gif from "../../src/image/2.gif";
import csv from "../../src/image/1997.png";
import Leftside from "./Leftside";
import $ from "jquery";

// const Csvupload = () =>{
export default class Csvupload extends React.Component {
  state = {
    selectFile: null,
    selecttype: null,
    selectname: null,
    checkbox: null,
  };
  fileSelectedHandaler = (event) => {
    this.setState({
      selectFile: event.target.files[0],
      selecttype: event.target.accept,
      selectname: event.target.files[0].name,
    });
  };
  checkoutme = (e) => {
    this.setState({
      checkbox: e.target.checked,
    });
  };

  fileupload = () => {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] === "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/csv_upload";
    } else {
      var url = "https://mpact.justcodenow.com/backend/api/csv_upload";
    }

    if (this.state.selectFile && this.state.selecttype == ".csv") {
      $(".error").show();
      const fd = new FormData();
      fd.append("image", this.state.selectFile, this.state.selectFile.name);
      fd.append("action", "action");
      axios({
        method: "post",
        url: url,
        data: fd,
      })
        .then(function (response) {
          console.log(response);
          swal("CSV Upload", "CSV Upload Successfully", "success");
          setTimeout(function () {
            window.location.reload(1);
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
          setTimeout(function () {
            swal("CSV Upload", "CSV Upload Successfully", "success");
          }, 110000);
          setTimeout(function () {
            window.location.reload(1);
          }, 112000);
        });
    } else {
      swal("Error", "Please Select CSV File", "error");
    }
  };

  render() {
    var j = this.state.selecttype;
    // var j = 'dfdf';
    var name = this.state.selectname;
    var check = this.state.checkbox;

  
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
                  <h1 className="mt-4 mb-3 txt">House File</h1>

                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Upload CSV File
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 mt-3">
                          <Form method="post" id="form_data">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>CSV Upload</Form.Label>
                              <Form.Control
                                type="file"
                                accept=".csv"
                                onChange={this.fileSelectedHandaler}
                                placeholder="Select File"
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                onChange={this.checkoutme}
                                type="checkbox"
                                label="Check me out"
                              />
                              {check ? (
                                <p></p>
                              ) : (
                                <p style={{ color: "red" }}>Please Checked</p>
                              )}

                              {j ? (
                                <div>
                                  <img
                                    className="image_gif1 csv_file"
                                    src={csv}
                                    alt="logo"
                                  />
                                  {name ? (
                                    <p className="check_text">{name}</p>
                                  ) : (
                                    <p>null</p>
                                  )}
                                </div>
                              ) : (
                                <h2></h2>
                              )}
                            </Form.Group>
                            <Button
                              className=" btn myBtn"
                              variant="primary"
                              
                              onClick={this.fileupload}
                            >
                              Submit
                            </Button>

                            <img
                              className="image_gif error"
                              src={gif}
                              alt="logo"
                            />
                          </Form>
                        </div>

                        <div className="col-md-3"></div>
                      </div>
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
