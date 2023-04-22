import { useEffect, useState } from "react";
import classes from "./FieldWorkerDetails.module.css";

const FieldWorkerDetails = (props) => {

  const isDetailViewSelected = props.isFieldWorkerDetailViewSelected;
  const [displayDataList, setDisplayDataList] = useState([]);

  useEffect(() => {
    const list = isDetailViewSelected
      ? props.fieldWorkerFollowUpsList
      : props.fieldWorkerAssignedPatientsList;
    setDisplayDataList(list);
  }, [
    props.fieldWorkerFollowUpsList,
    props.fieldWorkerAssignedPatientsList,
    props.isFieldWorkerDetailViewSelected,
  ]);

  const noDataMessage = isDetailViewSelected
    ? "No Follow Ups assigned to the selected field worker."
    : "No Patient assigned to the selected field worker.";

  const headerMessage = isDetailViewSelected
    ? "Follow Up Status"
    : "Assigned Patient Status";

  return (
    <div className={classes.center}>
      <h2>{headerMessage}</h2>

      {displayDataList.length === 0 && (
        <div>
          <h4 style={{ textAlign: "center" }}>{noDataMessage}</h4>
        </div>
      )}

      <div className={classes.ul}>
        {isDetailViewSelected === true &&
          props.fieldWorkerFollowUpsList.map((followUpData) => (
            <div key={followUpData.followUpId} className={classes.plist}>
              <div>ID : {followUpData.followUpId}</div>
              <div>Patient ID : {followUpData.patient.patientId}</div>
              <div>
                Status : {followUpData.flag === false ? "Pending" : "Completed"}
              </div>
            </div>
          ))}

        {isDetailViewSelected === false &&
          props.fieldWorkerAssignedPatientsList.map((assignedPatientData) => (
            <div key={assignedPatientData.patientId} className={classes.plist}>
              <div>Patient ID : {assignedPatientData.patientId}</div>
              <div>Patient Name : {assignedPatientData.name}</div>
              {/* <div>Patient DOB : {assignedPatientData.dob}</div>
              <div>Patient Contact : {assignedPatientData.contact}</div>
              <div>Patient Address : {assignedPatientData.address}</div>
              <div>Patient Pincode : {assignedPatientData.pincode}</div> */}
              <div>Patient Sex : {assignedPatientData.sex}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FieldWorkerDetails;
