import React from "react";
// import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";

export default function All_data() 
{
  

    const columns = ["Name", "Company", "City", "State"];

 

    const data = [
        ["Joe James", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT"],
        ["Bob Herm", "Test Corp", "Tampa", "FL"],
        ["James Houston", "Test Corp", "Dallas", "TX"],
       ];

       const options = {
        filterType: 'checkbox',
      };
       

  return (
      <div>
          <MUIDataTable 
            title={"Employee List"} 
            data={data} 
            columns={columns} 
            options={options} 
            />
      </div>
  );
}

// export default All_data;
