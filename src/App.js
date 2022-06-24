import React ,{Suspense , lazy} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Csvupload from './components/Csvupload';
import { connect } from 'react-redux';
import './css/styles.css';
import Admin from "./components/Admin";
import Login from "./components/Login";
import Prosfile from "./components/Prosfile";

// import Housefiledata from "./components/Housefiledata";
import Housefiledata from "./components/Housefiledata";

import Prospecting from "./components/Prospecting";
import Suffix_listing from "./components/Suffix/Suffix_listing";
import Suffixadd from "./components/Suffix/add";
import Suffixedit from "./components/Suffix/Suffix_edit";
import Duplicate from "./components/Suffix/Duplicate";
import Duplicate_data from "./components/Suffix/Duplicate_data";
import Duplicate_data_housefile from "./components/Suffix/Duplicate_data_housefile";
import ErrorPage from './components/ErrorPage';
import Exportable from './components/Exporttable';


require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: 0
    };

  }
  fileSelectedHandaler = event => {
    console.log(event.target);
  }
  
  render() 
  {
    var iAdminId  = localStorage.getItem("iAdminId");
    var vUserName = localStorage.getItem("vUserName");
    var setupTime = localStorage.getItem("setupTime");
    var hours = 5;
    var now = new Date().getTime();

    if (setupTime == null) 
    {
      localStorage.setItem("setupTime", now);
    } 
    else 
    {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("iAdminId");
        localStorage.removeItem("vUserName");
        localStorage.setItem("setupTime", now);
      }
    }

    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/housefile" component={ iAdminId ? Csvupload : Login } />
            
            <Route exact path="/prosfile" >
              {iAdminId ? <Prosfile /> : <Login />}
            </Route>

            <Router exact path="/login">
              {iAdminId ? <ErrorPage /> : <Login />}
             
            </Router>

            <Router exact path="/housefiledata">
              { iAdminId ? <Housefiledata /> : <Login /> }
            </Router>

            <Router exact path="/prospectingdata">
              { iAdminId ? <Prospecting /> : <Login /> }
            </Router>

            <Route exact path="/">
              { iAdminId ? <Admin /> : <Login /> }
            </Route>

            <Router exact path="/suffix">
              { iAdminId ? <Suffix_listing /> : <Login /> }
            </Router>

            <Router exact path="/suffix/add">
              { iAdminId ? <Suffixadd /> : <Login /> }
            </Router>

            <Router exact path="/suffix/edit/:id">
              { iAdminId ? <Suffixedit /> : <Login /> }
            </Router>

            <Router exact path="/duplicate">
                {iAdminId ? <Duplicate /> : <Login />}
            </Router>

            <Router exact path="/duplicate-listing">
                {iAdminId ? <Duplicate_data /> : <Login />}
            </Router>
            
            <Router exact path="/house-file-listing">
              {iAdminId ? <Duplicate_data_housefile /> : <Login />}
            </Router>

            <Router exact path="/exporttable">
              {iAdminId ? <Exportable /> : <Login />}
            </Router>

          </Switch>
        </Router>
      </>
    );
  }
}
export default App;