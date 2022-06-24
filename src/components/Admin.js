import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../src/image/mpact.png";
import loader from "../image/7.gif"
import Leftside from "./Leftside";
import Draggable from "react-draggable";
import axios from "axios";
import swal from "sweetalert";
import csv_image from "../../src/image/1997.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProducts } from '../redux/actions/productActions'

const Admin = () => {
  const dispatch        = useDispatch();
  const [user, setUser] = useState("");
  const [Pros, setPros] = useState("");
  const [House, setHouse] = useState("");
  const [ProsData, setProsData] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [CsvData, setCsvData] = useState([]);
  const [Table, setTable] = useState("");
  const [duplicate, setduplicate] = useState("");
  const [Hide, setHide] = useState(false);


  const AddtocartProduct = async () => {
    if (answer_array[2] == "localhost:3000") {
      var urls = `http://localhost/react_app/backend/api/csv`;
    } else {
      var urls = "https://mpact.justcodenow.com/backend/api/csv";
    }
    const homepagedata = await axios.get(urls);
    if (homepagedata.data.data) {
      dispatch(setProducts(homepagedata.data.data));
    }
  };
  useEffect(() => {
    AddtocartProduct();
  }, []);
    
  

  function delete_data(e) {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var del = "http://localhost/react_app/backend/api/delete_csv_file";
    } else {
      var del = "https://mpact.justcodenow.com/backend/api/delete_csv_file";
    }
    var iCsvId = e.target.id;
    var iTable = e.target.value;
    const fd = new FormData();
    fd.append("iCsvId", iCsvId);
    fd.append("iTable", iTable);
    if (iCsvId != "undefined") {
      const dataa = axios
        .post(del, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            swal("Csv Data Deleted", res.data.message, "success");
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

  function search_data() {
    var mnth = ("0" + (startDate.getMonth() + 1)).slice(-2);
    var day = ("0" + startDate.getDate()).slice(-2);
    if (endDate) {
      var month = ("0" + (endDate.getMonth() + 1)).slice(-2);
      var days = ("0" + endDate.getDate()).slice(-2);
      var EndDate = [endDate.getFullYear(), month, days].join("-");
    }

    var StartDate = [startDate.getFullYear(), mnth, day].join("-");

    var answer = window.location.href;
    const answer_array = answer.split("/");
    console.log(answer_array);

    if (answer_array[2] == "localhost:3000") {
      var search =
        "http://localhost/react_app/backend/api/date_wise_csv_search";
    } else {
      var search =
        "https://mpact.justcodenow.com/backend/api/date_wise_csv_search";
    }

    const fd = new FormData();
    fd.append("StartDate", StartDate);
    fd.append("EndDate", EndDate);
    fd.append("Table", Table);

    const dataa = axios
      .post(search, fd)
      .then((res) => {
        if (res.data.Status == "0") {
          setCsvData(res.data.data);
          // swal("Suffix Abbreviation Data", res.data.message, "success");
          setTimeout(function () {
            // window.location.reload(1);
          }, 2000);
        } else {
          setCsvData("");
          swal("CSV Upload", res.data.message, "error");
        }
      })
      .catch((error) => {});
  }
  var answer = window.location.href;
  const answer_array = answer.split("/");

  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/react_app/backend/api/csv`;
  } else {
    var urls = "https://mpact.justcodenow.com/backend/api/csv";
  }
  const HomepageArrays = useSelector((state) => state.Homepage.HomepageArray);

  setTimeout(function () 
  {
    setUser(HomepageArrays.count);
    setUser(HomepageArrays.count);
    setPros(HomepageArrays.pcount);
    setHouse(HomepageArrays.house);
    setProsData(HomepageArrays.prospecting);
    setduplicate(HomepageArrays.duplicate);
  }, 100);

  setTimeout(function () 
  {
    setHide(true)
  },5000);



  return (
    <div >
      <div className={`loader ${Hide  ? 'd-none' : ''}` }>
        <div><img src={loader} /></div>
      </div>
      <div className="flex">
        <div>
          <a href="/">
          <img className="image home" src={logo} alt="logo" />
          </a>
        </div>
      </div>
      <div id="layoutSidenav">
        <Leftside />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4 mb-3 txt">DASHBOARD</h1>
              <div className="row">
                <div className="col-xl-3 col-lg-6  col-md-6 col-sm-10 mx-auto">
                  <div className="card  cards mb-4">
                    <div className="card-body">
                      
                      <h6> House File Total Data </h6>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {user ? <h2>{user}</h2> : <h2>0</h2>}
                      <div className="myIcon">
                        
                        <i className="fas fa-columns"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6  col-md-6 col-sm-10 mx-auto">
                  <div className="card  cards mb-4">
                    <div className="card-body">
                      <h6>Prospecting file Total Data</h6>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {Pros ? <h2>{Pros}</h2> : <h2>0</h2>}
                      <div className="myIcon">
                        <i class="fas fa-database"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6  col-md-6 col-sm-10 mx-auto">
                  <div className="card cards  mb-4">
                    <div className="card-body">
                      <h6>Duplicate Data House File</h6>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {House ? <h2>{House}</h2> : <h2>0</h2>}
                      <div className="myIcon">
                        <i class="fas fa-paste"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6  col-md-6 col-sm-10 mx-auto">
                  <div className="card cards  mb-4">
                    <div className="card-body">
                      <h6>Duplicate Data Prospecting File</h6>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {ProsData ? <h2>{ProsData}</h2> : <h2>0</h2>}
                      <div className="myIcon">
                        <i className="fas fa-clone"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6  col-md-6 col-sm-10 ">
                  <div className="card cards  mb-4">
                    <div className="card-body">
                      <h6>Total Exportable Prospecting File Records</h6>
                    </div>
                    <div className="card-footer d-flex align-items-right justify-content-between">
                      {duplicate ? <h2>{duplicate}</h2> : <h2>0</h2>}
                      <div className="myIcon">
                        <i style={{ color: "white" }} className="fas fa-file-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className = "mb-4" />
            </div>
            <div className="row container-fluid ">
              <div className=" col-md-3 col-sm-10 myBox mr-4 mb-4 ">
                <div className="form-group ">
                  <label className="form-control-label" for="vTitle">
                    Table Name
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => setTable(e.target.value)}
                  >
                    <option>Select Table</option>
                    <option value="1">Prospecting Table</option>
                    <option value="2">House File Table</option>
                  </select>
                  <span className="red"></span>
                </div>
              </div>
              <div className="  col-md-3 col-sm-10 myBox mr-4 mb-4  ">
                <div className="form-group">
                  <label className="form-control-label" for="vTitle">
                    Start Date
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="  col-md-3 col-sm-10 myBox mr-4 mb-4  ">
                <div className="form-group">
                  <label className="form-control-label" for="vTitle">
                    End Date
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>

              <div className="  col-md-2  mt-4  ">
                <div className="form-group">
                  <button
                    onClick={search_data}
                    className="btn myBtn"
                    style={{ "margin-top": "9px" }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12  mt-5 ">
                <table
                  className="table table-bordered dataTable myBox1 "
                  cellSpacing="0"
                  style={{ width: "75%", border: "1 px solid black" }}
                >
                  <thead>
                    <tr>
                      <th>CSV File</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CsvData.length != "0" ? (
                      CsvData.map((csv, index) => (
                        <tr>
                          <td>
                            <img
                              className=""
                              src={csv_image}
                              alt="logo"
                              style={{ width: "46px" }}
                            />{" "}
                            {csv.vCsvName}
                          </td>
                          <td>{csv.vStartDate}</td>
                          <td>
                            <center>
                              <button
                                value={`${csv.iTable}`}
                                id={`${csv.iCsvId}`}
                                onClick={delete_data}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            </center>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colspan="3">
                          <center>Record Not Found</center>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
