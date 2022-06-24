import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Leftside from "../Leftside";
import logo from "../../../src/image/mpact.png";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";

const Suffixedit = () => {
  let history = useHistory();
  var iSuffixAbbId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const [Suffix, setSuffix] = useState("");
  const [SuffixName, setSuffixName] = useState([]);

  const [iSuffixId, setSuffixId] = useState([]);
  const [Suffixabb, setSuffixabb] = useState("");
  const [Suffixabbsort, setSuffixabbsort] = useState("");

  const [SuffixabbError, setSuffixabbError] = useState("");
  const [SuffixabbsortError, setSuffixabbsortError] = useState("");
  const [SuffixIdError, setSuffixIdError] = useState("");

  function suffixall() {
    if (iSuffixId) {
      setSuffixIdError("");
    } else {
      setSuffixIdError("Please Select Suffix Name");
    }

    if (Suffixabb) {
      setSuffixabbError("");
    } else {
      setSuffixabbError("Please Enter Suffix or Abbreviation Name");
    }
    if (Suffixabbsort) {
      setSuffixabbsortError("");
    } else {
      setSuffixabbsortError("Please Enter Postal Service Suffix");
    }

    if (iSuffixId && Suffixabb) {
      var answer = window.location.href;
      const answer_array = answer.split("/");
      console.log(answer_array);

      if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/react_app/backend/api/suffix_add";
      } else {
        var url = "https://mpact.justcodenow.com/react_app/api/suffix_add";
      }

      const fd = new FormData();
      fd.append("iSuffixId", iSuffixId);
      fd.append("vSuffixName", Suffixabb);
      fd.append("vSuffixNameSort", Suffixabbsort);
      fd.append("iSuffixAbbId", iSuffixAbbId);
      fd.append("Action", "Action");

      const dataa = axios
        .post(url, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            swal("Suffix Abbreviation Data", res.data.message, "success");
            setTimeout(function () {
              history.push("/suffix");
              window.location.reload(1);
            }, 2000);
          } else {
            swal("CSV Upload", res.data.message, "error");
          }
        })
        .catch((error) => {});
    }
  }

  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/react_app/backend/api/get_all_suffix?iSuffixAbbId=${iSuffixAbbId}`;
    var suff = `http://localhost/react_app/backend/api/get_all_suffix`;
  } else {
    var urls = `https://mpact.justcodenow.com/react_app/api/get_all_suffix?iSuffixAbbId=${iSuffixAbbId}`;
    var suff = `https://mpact.justcodenow.com/react_app/api/get_all_suffix`;
  }

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setSuffix(res.data.data.vName);
        setSuffixId(res.data.data.iSuffixId);
        setSuffixabb(res.data.data.vSuffixName);
        setSuffixabbsort(res.data.data.vSuffixNameSort);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(suff)
      .then((res) => {
        setSuffixName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(SuffixName);
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
                
                  <h1 className="txt">
                    Suffix Or Abbreviation
                  </h1>
                

                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Suffix Information Added
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="form-control-label" for="vTitle">
                          
                            Suffix Name
                          </label>
                          <input
                            type="text"
                            id="vTitle"
                            className="form-control"
                            value={Suffix}
                            readonly
                          />
                        </div>
                      </div>

                      <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="form-control-label" for="vTitle">
                            
                            Suffix Name
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => setSuffixId(e.target.value)}
                          >
                            <option>Select Suffix Name</option>
                            {SuffixName.map((suff, index) => (
                              <option
                                selected={
                                  suff.iSuffixId == iSuffixId ? "selected" : ""
                                }
                                value={suff.iSuffixId}
                              >
                                {suff.vName}
                              </option>
                            ))}
                          </select>
                          <span className="red">{SuffixIdError}</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="form-control-label" for="vTitle">
                            Suffix or Abbreviation (ALLEE)
                          </label>
                          <input
                            type="text"
                            id="vTitle"
                            onChange={(e) => setSuffixabb(e.target.value)}
                            className="form-control"
                            value={Suffixabb}
                            placeholder="ALLEE"
                          />
                          <span className="red">{SuffixabbError}</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="form-control-label" for="vTitle">
                            Postal Service Suffix Abbreviation (ALY)
                          </label>
                          <input
                            type="text"
                            id="vTitle"
                            onChange={(e) => setSuffixabbsort(e.target.value)}
                            className="form-control"
                            value={Suffixabbsort}
                            placeholder="ALY"
                          />
                          <span className="red">{SuffixabbsortError}</span>
                        </div>
                      </div>
                      <div className="col-md-3 mt-4 ml-2">
                        <button
                          onClick={suffixall}
                          className="btn myBtn btn-md suff_add"
                        >
                          Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <a href="/suffix">
                          <button className="btn myBtn btn-md suff_add">
                            Back
                          </button>
                        </a>
                      </div>
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

export default Suffixedit;
