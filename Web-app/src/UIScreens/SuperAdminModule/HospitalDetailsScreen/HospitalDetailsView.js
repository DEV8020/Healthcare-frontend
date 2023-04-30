import classes from "./HospitalDetailsView.module.css";
import React from "react";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";

const HospitalDetailsView = (props) => {

  const addHospitalCallBackHandler = (hospitalData) => {
    console.log("addHospitalCallBackHandler called");
    console.log(hospitalData);
    props.selectedHospitalCallBackHandler(hospitalData);
  };

  console.log("props.hospitalsListWithNoAdmin in Hospitaldetailsview screen");
  console.log(props.hospitalsListData);

  var innerLoopData = <h4>Please add hospitals in the list to add user.</h4>;

  if (props.hospitalsListData.length !== 0) {
    innerLoopData = props.hospitalsListData.map((hospitalData) => (
      <div key={hospitalData.hospId} className={classes.plist}>
        <div>ID : {hospitalData.hospId}</div>
        <div>Name : {hospitalData.name}</div>
        <div>Address : {hospitalData.address}</div>
        <AddButton
          value="Add"
          onClick={() => addHospitalCallBackHandler(hospitalData)}
        />
      </div>
    ));
  }

  return (
    <div className={classes.center}>
      <h2> Hospitals List</h2>
      <div className={classes.ul}>{innerLoopData}</div>
    </div>
  );
};

export default HospitalDetailsView;
