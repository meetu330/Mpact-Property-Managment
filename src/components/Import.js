import React , {useState} from 'react';

import axios from 'axios';

export default function Import(prop) {
    const [data,setData] = useState();
  
    var JSONObject= JSON.parse(prop.data);
    var j = JSON.parse(prop.data);
    
     
  return (
      <div>
          <div className="jumbotron text-center">
                    <h2>All User Data</h2>
                    </div>
                    
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-8 mt-5">
                        <table id="example" className="display">
                          <thead>
                              <tr>
                                  <th>id</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Address</th>
                                  <th>Phone</th>
                                
                              </tr>
                          </thead>
                          <tbody>
                          { JSONObject.map(column => (
                              <tr>
                                  <td>{ column.iUserId }</td>
                                  <td>{ column.vName }</td>
                                  <td>{ column.vEmail }</td>
                                  <td>{ column.tAddress }</td>
                                  <td>{ column.vPhone }</td>
                              </tr>
                          ))
                          }
                          
                          </tbody>
       
                        </table>
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                    </div>
         
      </div >
      
   
  );
}