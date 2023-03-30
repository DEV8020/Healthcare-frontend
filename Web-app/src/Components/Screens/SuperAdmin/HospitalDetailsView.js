import classes from "./HospitalDetailsView.module.css"

import React from "react";


const HospitalDetailsView = (props) => {
  const hospitalList = [
    {
      H_id: "f1",
      p_id:"p1",
      status:"Completed"


    },
    {
      H_id: "f2",
      p_id:"p2",
      status:"Pending"
    },
    {
      fl_id: "f3",
      p_id:"p3",
      status:"Completed"
    },
  ];


  return (
    <div className={classes.center}>
      <h2> Hospital List</h2>
      <div className={classes.ul}>
        {hospitalList.map((hospital) => (
          <div key={hospital.fl_id} className={classes.plist}>
            <div>ID:{hospital.fl_id}</div>
            <div>Patient ID:{hospital.p_id}</div>
            <div>Status:{hospital.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDetailsView;