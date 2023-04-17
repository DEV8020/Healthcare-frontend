import React, { useState, useEffect } from "react";
import classes from "./FieldWorkerList.module.css";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
// import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";

const FieldWorkerList = (props) => {

  const [fieldWorkerList, setFieldWorkerList] = useState([]);


  const getFieldWorkerDetailsHandler = (fieldWorkerData) => {
    console.log("getFieldWorkerDetailsHandler is  ");
    console.log(fieldWorkerData);
    props.showMessageAtBottomBar({message : "Selected Field Worker : " + fieldWorkerData.name, isErrorMessage : false});
    props.loadFieldWorkerDetailsData(fieldWorkerData);
    props.setFieldWorkerStatus(true);
  };

  console.log("props.fieldWorkerList in field worker list screen");
  console.log(props.fieldWorkerList);

// SupervisorAPIHandler
  useEffect(() => {
    //Hard Coded supervisor ID...
    SupervisorAPIHandler.getAllFieldWorkerListAPI({
      // supervisorID: "supervisorID",
      getAllFieldWorkerListAPIHandler: getAllFieldWorkerListAPIHandler,
    });
  }, []);

  // isFieldWorkerListRecieved: true,
  //         fieldWorkerListData: fieldWorkerListResponseData.responseData.data,
  //         errorMessage: null,

  const getAllFieldWorkerListAPIHandler = (fieldWorkerListData) => {
    if(fieldWorkerListData.isFieldWorkerListRecieved === true){
      setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
    }
    
    console.log("getAllFieldWorkerListAPIHandler added called response");
    console.log(fieldWorkerListData.fieldWorkerListData);
  };




  return (

    <div className={classes.center}>
      <h1> Field Worker List</h1>

      {fieldWorkerList.length === 0 && (
        <div>
          <h3 style={{textAlign : "center"}}>No Field Worker to display. Please add some.</h3>
        </div>
      )}


      <div className={classes.ul}>
        {fieldWorkerList.map((fieldworkerdata) => (
          <div key={fieldworkerdata.authId} className={classes.plist}>
            <div>ID : {fieldworkerdata.authId}</div>
            <div>userId : {fieldworkerdata.username}</div>
            <div>Name : {fieldworkerdata.name}</div>
            <div>Contact No. : {fieldworkerdata.contact}</div>

            <AddButton
              value="Details"
              onClick={() => getFieldWorkerDetailsHandler(fieldworkerdata)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerList;
