import React , { useState , useEffect} from "react";
import Datatable from "./Datatable";

require('es6-promise').polyfill();
require('isomorphic-fetch');

  


export default function Table(){
    const [data , setData] = useState([]);
    const [q , setQ]    = useState("");


    useEffect(() =>{
        fetch("http://localhost/react_app/backend/api/csv_all")
        .then(response =>response.json())
        .then((json)=>setData(json));
    },[])


    function search(rows)
    {
        return rows.filter(
            (row) => 
            row.vFirstName.toLowerCase().indexOf(q) > -1 ||
            row.vLastname.toLowerCase().indexOf(q) > -1 ||
            row.vStreet.toLowerCase().indexOf(q) > -1 ||
            row.vState.toLowerCase().indexOf(q) > -1 ||
            row.dtAddeddate.toLowerCase().indexOf(q) > -1
        );
    }


    console.log(q);

    return(
        <div>
            <div>
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>

            <Datatable data={ search(data) }/>
        </div>
    )


}