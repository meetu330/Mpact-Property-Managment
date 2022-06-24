import React from "react";
import DataTable from 'datatables.net';
import logo from '../../src/image/3.gif';

const Table = () => {
    return (
        <div>
            <button className="btn btn-primary click_me" style={{ display: "none" }}> CLICK</button>
            {/* <input type="text" class=" jayesh" placeholder="Enter Text"></input> */}
            <table className="table table-bordered dataTable" id="dataTable" width="99%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Street</th>
                        <th>State</th>
                    </tr>
                </thead>
            </table>
            <img className="datatable_loader" src={logo} alt="logo" />
        </div>
    );
}

export default Table;

