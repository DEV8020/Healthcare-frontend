import classes from "./PatientDetailsView.module.css";
import React, { useEffect, useState } from "react";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import ListDetailView from "../../GenericModule/UserDetailsScreen/ListDetailView";
import SingleDataDetailView from "../../GenericModule/UserDetailsScreen/SingleDataDetailView";
import FrontDeskUtilitiesMethods from "../FrontDeskUtilitiesKeys/FrontDeskUtilitiesMethods";

const PatientDetailsView = (props) => {
  const [patientDetailsData, setPatientDetailsData] = useState({
    patientId: "",
    name: "",
    address: "",
    age: "",
    sex: "",
    contact: "",
  });

  console.log("viewDetalsPatientID in patient details view...");
  console.log(props.viewDetalsPatientID);

  useEffect(() => {
    FrontDeskAPIHandler.GetPatientDetailsData({
      patientID: props.viewDetalsPatientID,
      getPatientDetailsResponseHandler: getPatientDetailsResponseHandler,
    });
    console.log("use effect running");
  }, [props.viewDetalsPatientID]);

  const getPatientDetailsResponseHandler = (patientDetailsResponseData) => {
    console.log("getPatientDetailsResponseHandler called");
    console.log(patientDetailsResponseData.patientDetailsData);

    console.log(patientDetailsResponseData);

    if (
      patientDetailsResponseData.isPatientDetailsRecievedSuccessFully === false
    ) {
      props.showMessageBarAtTheBottom({
        message: patientDetailsResponseData.errorMessage,
        isErrorMessage: true,
      });
      props.setPatientDetailsView(false);
      return;
    }

    setPatientDetailsData((patientDetailsData) => {
      console.log({
        ...patientDetailsData,
        ...patientDetailsResponseData.patientDetailsData,
      });
      return {
        ...patientDetailsData,
        ...patientDetailsResponseData.patientDetailsData,
      };
    });
  };
  console.log(
    "FrontDeskUtilitiesMethods.processPatientDetailDataToDisplay(patientDetailsData)"
  );
  console.log(
    FrontDeskUtilitiesMethods.processPatientDetailDataToDisplay(
      patientDetailsData
    )
  );

  const employee = FrontDeskUtilitiesMethods.processPatientDetailDataToDisplay(
    patientDetailsData
  );

  return (
    <div className={classes.center}>
      <h2> Patient Details</h2>
      <div className={classes.ul}>
        <div className={classes.plist}>
          <SingleDataDetailView
            detailData={FrontDeskUtilitiesMethods.processPatientDetailDataToDisplay(
              patientDetailsData
            )}
          />
        </div>
        <AddButton
          value="Back"
          onClick={() => {
            props.setPatientDetailsView(false);
          }}
        />
      </div>
    </div>
  );
};

export default PatientDetailsView;
