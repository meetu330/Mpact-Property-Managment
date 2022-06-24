import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Leftside from "../Leftside";
import logo from "../../../src/image/mpact.png";

import gif from "../../../src/image/7.gif";
import axios from "axios";
import { useHistory } from "react-router"; 
import swal from "sweetalert";

const Duplicate = () => {
  let history                               = useHistory();
  const [Count, setCount]                   = useState("");
  const [CountHouse, setCountHouse]         = useState("");
  const [TableName, setItext3]              = useState("");

  const [Table, setTable]               = useState("");
  const [Replace_pros, setReplace_pros] = useState("0");
  const [Replace_hose, setReplace_hose] = useState("0");

  const [Hide, setHide]                         = useState("Duplicate Data Remove");
  const [Hide2, setHide2]                       = useState("Duplicate Data Remove");
  const [SelecttextNumber, setSelecttextNumber] = useState("");
  const [Text, setText]                         = useState(false);
  const [Text2, setText2]                       = useState(false);

  function replece_text_event(event) {
    if (TableName) {
      // setItext3(event.target.id);
    } else {
      setItext3(event.target.id);
    }

    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var urls = `http://localhost/react_app/backend/api/replace_text_data`;
    } else {
      var urls = `https://mpact.justcodenow.com/react_app/api/replace_text_data`;
    }
    const fd = new FormData();
    fd.append("TableName", TableName);
    fd.append("SelecttextNumber", SelecttextNumber);
    
    if (TableName && SelecttextNumber) {
      setText(false);
      setText2(false);
      if (TableName == 1) {
        setText(true);
      } else if (TableName == 2) {
        setText2(true);
      }
      const dataa = axios
        .post(urls, fd)
        .then((response) => {
  
          if (response.data.Status == "1") 
          {
            setText(false);
            setText2(false);
            swal("Dublicate Data", response.data.message, "success");
            setTimeout(function () {
              // window.location.reload(1);
            }, 2000);
          } 
          else if (response.data.Status == "0")
          {
            replece_text_event1();
          }
        })
        .catch((error) => {
          console.log("API errr", error);
        });
    }
  }

  function replece_text_event1() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var urls = `http://localhost/react_app/backend/api/replace_text_data1`;
    } else {
      var urls = `https://mpact.justcodenow.com/react_app/api/replace_text_data1`;
    }
    const fd = new FormData();
    fd.append("TableName", TableName);
    fd.append("SelecttextNumber", SelecttextNumber);
  

    if (TableName && SelecttextNumber) {
      setText(false);
      setText2(false);

      if (TableName == 1) {
        setText(true);
      } else if (TableName == 2) {
        setText2(true);
      }
      const dataa = axios
        .post(urls, fd)
        .then((res) => {
          if (res.data.Status == 1) {
            setText(false);
            setText2(false);
            swal("Dublicate Data", res.data.message, "success");
            setTimeout(function () {
              // window.location.reload(1);
            }, 2000);
          } 
          else if (res.data.Status == 0) 
          {
            replece_text_event();
          }
        })
        .catch((error) => {
          setTimeout(function () {
            window.location.reload(1);
          }, 600000);
        });
    }
  }

  function suffixall(event) {
    if (Table) {
    } else {
      const Tableid = event.target.id;
      setTable(Tableid);
    }

    var answer = window.location.href;
    const answer_array = answer.split("/");

    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/duplicate_remove";
    } else {
      var url = "https://mpact.justcodenow.com/react_app/api/duplicate_remove";
    }
    const fd = new FormData();
    fd.append("Action", "Action");
    fd.append("TableName", Table);
    if (Table) {
      if (Table == "1") {
        setHide(true);
      } else {
        setHide2(true);
      }

      const dataa = axios
        .post(url, fd)
        .then((res) => {
          setTimeout(function () {
            window.location.reload(1);
          }, 600000);
          console.log(res);
          if (Table == "1") {
            setCount(res.data.count);
          } else {
            setCountHouse(res.data.count);
          }

          if (res.data.count > 0) {
            suffixallclick();
          } else {
            if (Table == "1") {
              setHide("Duplicate Data Remove");
            } else {
              setHide2("Duplicate Data Remove");
            }
            swal(
              "Dublicate Data",
              "Duplicate data Remove Successfully",
              "success"
            );
            setTimeout(function () {
              window.location.reload(1);
            }, 100);
          }
        })
        .catch((error) => {
          console.log(error);
          swal(
            "Server",
            "Duplicate data Not Remove Please try Again!",
            "error"
          );
          setTimeout(function () {
            window.location.reload(1);
          }, 100);
        });
    }
  }

  function suffixallclick() {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/react_app/backend/api/duplicate_remove1";
    } else {
      var url = "https://mpact.justcodenow.com/react_app/api/duplicate_remove1";
    }
    const fd = new FormData();
    fd.append("Action", "Action");
    fd.append("TableName", Table);
    if (Table) {
      if (Table == "1") {
        setHide(true);
      } else {
        setHide2(true);
      }

      const dataa = axios
        .post(url, fd)
        .then((response) => {
          setTimeout(function () {
            window.location.reload(1);
          }, 600000);
          if (Table == "1") {
            console.log("second click", response.data.count);
            setCount(response.data.count);
          } else {
            setCountHouse(response.data.count);
          }
          if (response.data.count > 0) {
            suffixall();
          } else {
            if (Table == "1") {
              setHide("Duplicate Data Remove");
            } else {
              setHide2("Duplicate Data Remove");
            }
            swal(
              "Dublicate Data",
              "Duplicate data Remove Successfully",
              "success"
            );
            setTimeout(function () {
              // window.location.reload(1);
            }, 100);
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          setTimeout(function () {
            window.location.reload(1);
          }, 100);
        });
    }
  }

  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/react_app/backend/api/duplicate_remove_count`;
  } else {
    var urls = `https://mpact.justcodenow.com/react_app/api/duplicate_remove_count`;
  }

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setCount(res.data.count);
        setCountHouse(res.data.count_house);
        setReplace_pros(res.data.replace);
        setReplace_hose(res.data.replace_hose);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(SelecttextNumber);
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
                <h1 className="mt-4 mb-4 txt">Duplicate Data</h1>

                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Duplicate Data Remove
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="row">
                        <div className=" col-lg-4 col-md-12">
                          <h4>Total Prospecting Duplicate Data </h4>
                        </div>
                        <div className="col-lg-4  col-md-4">
                          <h4>
                            <p style={{ color: "red" }}>
                              {Count ? <p>{Count}</p> : <p>0</p>}
                            </p>
                          </h4>
                        </div>
                        {
                          <>
                            <div className="col-lg-4  col-md-6">
                              <button
                                id="1"
                                onClick={suffixall}
                                className="btn myBtn btn-md suff_add"
                              >
                                {Hide == true ? (
                                  <img className="dup_image" src={gif} />
                                ) : (
                                    <>{Hide} </>
                                )}
                              </button>
                            </div>
                          </>
                        }
                        {/* ***********************House File ******************* */}
                        <div className=" col-lg-4 col-md-12">
                          <h4>Total House File Duplicate Data </h4>
                        </div>
                        <div className="col-lg-4  col-md-4">
                          <h4>
                            <p style={{ color: "red" }}>
                              {CountHouse ? <p>{CountHouse}</p> : <p>0</p>}
                            </p>
                          </h4>
                        </div>
                        {
                          <>
                            <div className="col-lg-4  col-md-6">
                              <button
                                id="2"
                                onClick={suffixall}
                                className="btn myBtn btn-md suff_add"
                              >
                                {Hide2 == true ? (
                                  <img className="dup_image" src={gif} />
                                ) : (
                                  <>{Hide2}</>
                                )}
                              </button>
                            </div>
                          </>
                        }
                        <div className="col-md-6 ml-3">
                          <a href="/">
                            <button className="btn myBtn btn-lg suff_add">
                              Back
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row boxShadow">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Suffix Abbreviations Name Replace
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <h4>Prospecting File Data Replace</h4>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <select className="form-control" onChange={(e) => setSelecttextNumber(e.target.value)}>
                              <option value="">Select Text Replace Position</option>
                              <option value="0">1 Text Replace</option>
                              <option value="1">2 Text Replace</option>
                              <option value="2">3 Text Replace</option>
                              <option value="3">4 Text Replace</option>
                              <option value="4">5 Text Replace</option>
                              <option value="5">6 Text Replace</option>
                              <option value="7">7 Text Replace</option>
                             </select>
                          </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <button
                            id="1"
                            onClick={replece_text_event}
                            className="btn myBtn btn-md suff_add"
                          >
                            {Text == true && TableName==1 ? (
                              <img className="dup_image1" src={gif} />
                            ) : (
                              <> Text Replace</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <h4>House File Data Replace</h4>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <select className="form-control" onChange={(e) => setSelecttextNumber(e.target.value)}>
                            <option value="">Select Text Replace Position</option>
                            <option value="0">1 Text Replace</option>
                            <option value="1">2 Text Replace</option>
                            <option value="2">3 Text Replace</option>
                            <option value="3">4 Text Replace</option>
                            <option value="4">5 Text Replace</option>
                            <option value="5">6 Text Replace</option>
                            <option value="6">7 Text Replace</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <button
                            id="2"
                            onClick={replece_text_event}
                            className="btn myBtn btn-md suff_add"
                          >
                            {Text2 == true && TableName == 2 ? (
                              <img className="dup_image1" src={gif} />
                            ) : (
                              <> Text Replace</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-header boxShadow mt-3">
                      <i class="far fa-hand-point-right"></i>
                      <b> NOTE :- </b>
                      Double Click on the button & Single Process will work at
                      Single Time

                      <hr></hr>
                      <h5>Replace Process</h5>
                      <b>STREET  : </b> 4060 GRINDSTONE WAY
                      <hr></hr>
                      <p> 1 Text Replace : 4060 </p>
                      <p> 2 Text Replace : GRINDSTONE </p>
                      <p> 3 Text Replace : WAY </p>
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
};

export default Duplicate;
