import classes from "./FieldWorkerUpdates.module.css";
import React, { useEffect, useState } from "react";
import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";

const FieldWorkerUpdates = (props) => {
  const [followUpUpdateList, setFollowUpUpdateList] = useState([]);

  //Use Effect Block to load Follow Ups List for the Doctor...
  useEffect(() => {
    DoctorAPIHandler.getFollowUpUpdates({
      fieldWorkerFollowUpsUpdates: fieldWorkerFollowUpsUpdates,
    });
  }, [props.isFollowUpListNeedToRefresh]);

  //Call Back Method for recieving Follow ups data...
  const fieldWorkerFollowUpsUpdates = (followUpUpdateData) => {
    console.log("fieldWorkerFollowUpsUpdates called");
    console.log(followUpUpdateData);

    if (followUpUpdateData.isFollowUpsRecieved === false) {
      props.showMessageHandler({
        message: followUpUpdateData.errorMessage,
        isErrorMessage: true,
      });
      // return;
    }

    setFollowUpUpdateList(followUpUpdateData.followUpsData);
    console.log("fieldWorkerFollowUpsUpdates called set data");

    // followUpUpdateData.followUpsData.map((followUpData) => {
    //   console.log(followUpData);
    // });

    // {followUpId: 1, encounter: {…}, date: '09-04-2023', fieldWorkerRemarks: null, doctorRemarks: 'Hello hi', …}
    // date
    // :
    // "09-04-2023"
    // doctorRemarks
    // :
    // "Hello hi"
    // encounter
    // :
    // {encounterId: 2, flag: true, doctor: {…}, prescription: 'DOLO', symptoms: 'Headache, Fever', …}
    // fieldWorkerRemarks
    // :
    // null
    // flag
    // :
    // false
    // followUpId
    // :
    // 1
    // hospital
    // :
    // {hospId: 1, name: 'Dharavi Charitable', address: '141001', supId: {…}}
    // lastSyncDate
    // :
    // null
    // patient
    // :
    // {patientId: 1, name: 'mareez', address: '565220', age: 22, sex: 'Nhi btaunga', …}
    // [[Prototype]]
    // :
    // Object
  };

  return (
    <div className={classes.center}>
      <h2> Follow Up Status</h2>

      {followUpUpdateList.length === 0 && (
        <div>
          {" "}
          <h3 style={{ textAlign: "center" }}>
            No follow up updates to display.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {followUpUpdateList.map((followup) => (
          <div key={followup.followUpId} className={classes.plist}>
            <div>Follow Up ID : {followup.followUpId}</div>
            <div>Patient ID : {followup.patient.patientId}</div>
            <div>Patient Name : {followup.patient.name}</div>
            <div>
              Status : {followup.flag === false ? "Pending" : "Completed"}
            </div>
            <div>
              Field Worker Mesaage :{" "}
              {followup.fieldWorkerRemarks ? followup.fieldWorkerRemarks : "NA"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerUpdates;
