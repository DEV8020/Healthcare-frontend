import classes from "./HospitalDetailsView.module.css";

import React from "react";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

const HospitalDetailsView = (props) => {
//   const hospitalList = [
//     {
//       H_id: "f1",
//       p_id: "p1",
//       status: "Completed",
//     },
//     {
//       H_id: "f2",
//       p_id: "p2",
//       status: "Pending",
//     },
//     {
//       fl_id: "f3",
//       p_id: "p3",
//       status: "Completed",
//     },
//   ];


  const addHospitalCallBackHandler = (hospitalData) => {
    console.log("addHospitalCallBackHandler called");
    console.log(hospitalData);
    props.selectedHospitalCallBackHandler(hospitalData);
  };

  console.log("props.hospitalsListWithNoAdmin in Hospitaldetailsview screen");
  console.log(props.hospitalsListData);

  var innerLoopData = <h1>No Data to Display...</h1>;

  if (props.hospitalsListData.length !== 0) {
    innerLoopData = props.hospitalsListData.map((hospitalData) => (
      <div key={hospitalData.hospId} className={classes.plist}>
        <div>ID:{hospitalData.hospId}</div>
        <div>Hospital Name:{hospitalData.name}</div>
        <div>Address:{hospitalData.address}</div>
        {/* <AddButton */}
        <AddButton
          value="Add"
          onClick={() => addHospitalCallBackHandler(hospitalData)}
        />
      </div>
    ));
  }


  return (
    <div className={classes.center}>
      <h2> Hospital List</h2>
      <div className={classes.ul}>
        {innerLoopData}
      </div>
    </div>
  );
};

export default HospitalDetailsView;
