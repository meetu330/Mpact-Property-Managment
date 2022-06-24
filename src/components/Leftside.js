import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../src/image/Mpact_logo-1200x720.jpg";
import { useHistory } from "react-router";

const Leftside = () => {
  let history = useHistory();
  const [active, setActive] = useState(false);

  const toggle = () => {
        if (active == false) {
            setActive(true)
        }else{
            setActive(false)
        }
  }

  function logout() 
  {
    localStorage.removeItem("iAdminId");
    localStorage.removeItem("vUserName");
   
    setTimeout(function () {
      history.push("/login");
      window.location.reload(1);
    }, 100);
  }

  return (
    <>
      <button className="btn btn2 mr-3" id="sidebarToggle" href="#!"  onClick = {toggle}>
        <i className="fas fa-bars"></i>
      </button>
      <button onClick={logout} className="btn btn3 mr-3">
        <i style={{ color: "#f53844" }} className="fas fa-power-off mr-2"></i>
        Logout
      </button>

      <div id="layoutSidenav_nav" className = {`${active ? "hideNav" : ""}`}>
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading"></div>
              <a className="nav-link" href="/">
                <div className="sb-nav-link-icon">
                  <i  style= {{color :" #4776E6"}} className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </a>
              <a className="nav-link" href="/housefile">
                <div className="sb-nav-link-icon">
                  <i    style= {{color :"#FF8008"}}   className="fas fa-house-user"></i>
                </div>
                House File
              </a>
              <a className="nav-link" href="/prosfile">
                <div className="sb-nav-link-icon">
                  <i   style= {{color :" #EB3349"}}  className="fas fa-file-alt"></i>
                </div>
                Prospecting File
              </a>
              <div className="sb-sidenav-menu-heading">Data Listing</div>
              <a
                className="nav-link collapsed"
                href="/housefiledata"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i  style= {{color :"#DD5E89"}}   className="fas fa-columns"></i>
                </div>
                Housefile Data
                <div className="sb-sidenav-collapse-arrow"></div>
              </a>
              <a
                className="nav-link collapsed"
                href="/prospectingdata"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i  style= {{color :"#1FA2FF"}}   class="fas fa-database"></i>
                </div>
                Prospecting data
                <div className="sb-sidenav-collapse-arrow">
                  <i  style={{color : "#fff"}} className="fas fa-angle-down"></i>
                </div>
              </a>
              <a className="nav-link collapsed" href="/suffix">
                <div className="sb-nav-link-icon">
                  <i   style= {{color :"#26D0CE"}}  className="fas fa-book-open"></i>
                </div>
                Suffix
              </a>
              <a className="nav-link collapsed" href="/duplicate">
                <div className="sb-nav-link-icon">
                  <i  style= {{color :"#DD2476"}}   class="fas fa-copy"></i>
                </div>
                Duplicate Data Remove
              </a>
              <div className="sb-sidenav-menu-heading">Duplicate Data</div>
              <a className="nav-link collapsed" href="/duplicate-listing">
                <div className="sb-nav-link-icon">
                  <i   style= {{color :" #F09819"}}  class="fas fa-clone"></i>
                </div>
                Duplicate Data Prospecting
              </a>
              <a className="nav-link collapsed" href="/house-file-listing">
                <div className="sb-nav-link-icon">
                  <i  style= {{color :"#E55D87"}}   class="fas fa-paste"></i>
                </div>
                Duplicate Data House File
              </a>

              <a className="nav-link collapsed" href="/exporttable">
                <div className="sb-nav-link-icon">
                  <i style={{ color: "blue" }} class="fas fa-book-open"></i>
                </div>
                Exportable Prospecting File Records
              </a>


              <a onClick={logout} className="nav-link collapsed">
                <div className="sb-nav-link-icon">
                  <i style={{ color: "#f53844" }} class="fas fa-power-off "></i>
                </div>
                Logout
              </a>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <a
                    className="nav-link collapsed"
                    href="javascript:;"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseAuth"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="login.html">
                        Login
                      </a>
                      <a className="nav-link" href="register.html">
                        Register
                      </a>
                      <a className="nav-link" href="password.html">
                        Forgot Password
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="javascript:;"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                </nav>
              </div>
              {/* <div className="sb-sidenav-menu-heading">Addons</div> */}
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Powered By Justcodenow</div>
          </div>
        </nav>
      </div>
    </>
  );
  //   }
};

export default Leftside;
