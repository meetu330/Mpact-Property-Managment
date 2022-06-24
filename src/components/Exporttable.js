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

class Exportable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dublicate: [],
            csv_download: [],
            csv_download_count: [],
        };
    }

    async componentDidMount() {
        var answer = window.location.href;
        const answer_array = answer.split("/");
        if (answer_array[2] == "localhost:3000") {
            var url = "http://localhost/react_app/backend/api/csv_dublicate_data";
        } else {
            var url = "https://mpact.justcodenow.com/backend/api/csv_dublicate_data";
        }

        const response = await fetch(url);
        const data = await response.json();

        this.setState({ dublicate: data});
    }

    render() {
        // CSV download code
        var datacsv = this.state.dublicate;

        const headers = [
            { label: "Id", key: "id" },
            { label: "Contributor firstname", key: "contributor_first_name" },
            { label: "Contributor Lastname", key: "contributor_last_name" },
            { label: "Contributor Street", key: "contributor_street_1" },
            { label: "Contributor City", key: "contributor_city" },
            { label: "Contributor Zip", key: "contributor_zip" },

        ];

        const csvReport = {
            filename: "Exportable-Prospecting-File-Records.csv",
            headers: headers,
            data: datacsv,
        };

    
        $(".datatable_loader").hide(100);
        $(".dataTable_p").DataTable({
            data: datacsv,
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
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-table me-1"></i>
                                        Exportable Data
                                        <hr></hr>
                                        {/* <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <CSVLink {...csvReport}><button type="button" className="btn  myBtn">CSV Export</button></CSVLink>
                                            </div>
                                            
                                        </div> */}
                                    </div>
                                    <div className="card-body">
                                        <table
                                            className="table table-bordered dataTable_p"
                                            id="dataTable_p"
                                            width="99.5%"
                                            cellSpacing="0">
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

export default Exportable;
