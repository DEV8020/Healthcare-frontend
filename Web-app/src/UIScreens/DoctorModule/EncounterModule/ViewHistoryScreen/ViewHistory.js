import classes from "./ViewHistory.module.css";
import { useEffect, useState } from "react";
// import DoctorAPIHandler from "../../../Controllers/DoctorAPIHandler";
import DoctorAPIHandler from "../../../../Controllers/DoctorAPIHandler";
// import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UtilitiesMethods from "../../../../Utilities/UtilitiesMethods";

const ViewHistory = (props) => {
  const [historyData, setHistoryData] = useState([]);

  historyData.map((hsitory) => {
    console.log("historyData.map((hsitory)");
    console.log(hsitory);
  });

  useEffect(() => {
    DoctorAPIHandler.getPatientHistoryUpdates({
      patientID: props.selectedEncounterData.patient.patientId,
      patientHistoryAPIResponseHandler: patientHistoryAPIResponseHandler,
    });
  }, []);

  const patientHistoryAPIResponseHandler = (patientHistoryData) => {
    if (patientHistoryData.isHistoryDataRecieved === false) {
      showMessageAtBottomBar({
        message: patientHistoryData.errorMessage,
        isErrorMessage: true,
      });
      return;
    }
    console.log("patientHistoryData");
    console.log(patientHistoryData);
    setHistoryData(patientHistoryData.historyData);
  };

  const showMessageAtBottomBar = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  return (
    <div className={classes.center}>
      <h2> Patient History</h2>

      {historyData.length === 0 && (
        <div>
          {" "}
          <h3 style={{ textAlign: "center" }}>
            No history to display.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {historyData.map((history) => (
          <div key={history.d_id} className={classes.plist}>
            <div>Doctor ID : {history.doctor.username}</div>
            <div>Patient Name : {history.patient.name}</div>
            <div>Symptoms : {history.symptoms}</div>
            <div>Prescription : {history.prescription}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHistory;
