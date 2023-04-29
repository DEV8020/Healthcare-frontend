import classes from "./FieldWorkerUpdates.module.css";
import React, { useEffect, useState } from "react";
import DoctorAPIHandler from "../../../../Controllers/DoctorAPIHandler";
import DoctorUtilitiesKeys from "../../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";

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
      return;
    }
    setFollowUpUpdateList(followUpUpdateData.followUpsData);
  };

  console.log("followUpUpdateList");
  console.log(followUpUpdateList);

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

             
            <div style={{ whiteSpace: "pre" }}>
              {DoctorUtilitiesKeys.getReadingsParsedData(followup)}
            </div>

            {/* Object.keys(followUpData.readings).map((key, index) => {
    console.log(followUpData.readings[key]);
    if (
      followUpData.readings[key] !== "FALSE" &&
      followUpData.readings[key] !== "TRUE"
    ) {
      console.log("false");
      return false;
    }
  });
{} */}

            {/* {Object.keys(followup.readings).map((key, index) => {
              console.log(followup.readings[key])
              {(followup.readings[key] !== false) && <div>
              {key} :{" "}
              {DoctorUtilitiesKeys.getReadingsParsedData(followup)}
            </div>}
            })} */}

            {/* {DoctorUtilitiesKeys.isReadingsDataEmpty(followup) === false && <div>
              Readings Data :{" "}
              {DoctorUtilitiesKeys.getReadingsParsedData(followup)}
            </div>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldWorkerUpdates;
