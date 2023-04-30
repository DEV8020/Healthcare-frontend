import classes from "./PatientDetailsView.module.css";
import React, { useEffect, useState } from "react";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import SingleDataDetailView from "../../GenericModule/UserDetailsScreen/SingleDataDetailView";
import FrontDeskUtilitiesMethods from "../../../Utilities/FrontDeskUtilitiesKeys/FrontDeskUtilitiesMethods";

const PatientDetailsView = (props) => {
  const [patientDetailsData, setPatientDetailsData] = useState({
    patientId: "",
    name: "",
    address: "",
    age: "",
    sex: "",
    contact: "",
  });

  useEffect(() => {
    FrontDeskAPIHandler.GetPatientDetailsData({
      patientID: props.viewDetalsPatientID,
      getPatientDetailsResponseHandler: getPatientDetailsResponseHandler,
    });
  }, []);

  const getPatientDetailsResponseHandler = (patientDetailsResponseData) => {
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
