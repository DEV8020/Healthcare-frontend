import React, { useState } from "react";
import classes from "./PatientRegistration.module.css";
import Bdate from "../../../Components/Screens/UI Elements/Date Element/Bdate";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import FrontDeskUtilitiesKeys from "../FrontDeskUtilitiesKeys/FrontDeskUtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputTextField from "../../../Component/InputTextField/InputTextField";

const PatientRegistration = (props) => {
  const [patientRegistrationData, setPatientRegistrationData] = useState(
    FrontDeskUtilitiesKeys.getPatientRegistrationInitialData()
  );

  //Single Data Handler for Input TextField change...
  const PatientDataChangeHandler = (userModifiedData) => {
    setPatientRegistrationData((patientData) => {
      return { ...patientData, ...userModifiedData };
    });
  };

  const patientBdateChangeHandler = (event) => {
    PatientDataChangeHandler({ dob: event.target.value });
  };

  const AddPatientDataHandler = (event) => {
    event.preventDefault();

    //####################### Patient's Contact Number Validation #######################

    //Validation for user contact number...
    const userContactNumber =
      patientRegistrationData[
        FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().contactKey
      ];
    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    //Show Alert Message in case of Invalid Contact Number...
    if (userContactNumber.length !== userContactNumberRequiredLength) {
      showErrorMessageScreen(
        UtilitiesKeys.getGeneralValidationMessagesText()
          .phoneNumberNotValidMessage,
        true
      );
      return;
    }

    //####################### Patient's Pin Code Validation #######################

    //Validation for user Pin Code...
    const userPinCodeMappedKey =
      FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().pinCodeKey;
    // const patientAddressPinCode = patientRegistrationData[userPinCodeMappedKey];
    const userPinCodeRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    );

    //Show Alert Message in case of Invalid PIN CODE...
    if (
      patientRegistrationData[userPinCodeMappedKey].length !==
      userPinCodeRequiredLength
    ) {
      showErrorMessageScreen(
        UtilitiesKeys.getGeneralValidationMessagesText().pinCodeNotValidMessage,
        true
      );
      return;
    }

    //Front Desk : Register New Patient API call...
    FrontDeskAPIHandler.RegisterNewPatientAPICall({
      patientData: patientRegistrationData,
      registerNewPatientResponseCallBack: registerNewPatientResponseCallBack,
    });
  };

  const showErrorMessageScreen = (errorMessage, isError) => {
    console.log(isError);
    props.setAlertMessage(errorMessage);
    props.setAlertFlag(true);
  };

  const registerNewPatientResponseCallBack = (newPatientResponseData) => {
    console.log("registerNewPatientResponseHandler response is ");
    console.log(newPatientResponseData);

    // if (newPatientResponseData.errorMessage === null) {
    if (newPatientResponseData.isNewPatientAdded === true) {
      showErrorMessageScreen(
        patientRegistrationData[
          FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().nameKey
        ] + " has been registered successfully.",
        false
      );
      resetPatientDataAfterRegister();
    } else {
      // else if (newPatientResponseData.isNewPatientAdded === null) {
      showErrorMessageScreen(newPatientResponseData.errorMessage, true);
    }
    // if (newPatientResponseData.isNewPatientAdded === false) {
    //   showErrorMessageScreen(
    //     "Some error occured. Please try again later.",
    //     true
    //   );
    // }
    // }
  };

  const resetPatientDataAfterRegister = () => {
    PatientDataChangeHandler(
      FrontDeskUtilitiesKeys.getPatientRegistrationInitialData()
    );
  };

  const cancelButtonHandler = () => {
    props.setFrontDeskOption("frontDesk");
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Register Patient</h1>

        <form id="addPatient-form" onSubmit={AddPatientDataHandler}>
          {/* Patient's Name Text Field... */}
          <InputTextField
            label={
              FrontDeskUtilitiesKeys.getPatientRegistrationLabelKeys().nameKey
            }
            onChange={PatientDataChangeHandler}
            mappedKey={
              FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().nameKey
            }
            value={
              patientRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey
              ]
            }
          />

          {/* Patient's Contact Number Text Field... */}
          <InputNumericTextField
            label={
              FrontDeskUtilitiesKeys.getPatientRegistrationLabelKeys()
                .contactKey
            }
            onChange={PatientDataChangeHandler}
            mappedKey={
              FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().contactKey
            }
            value={
              patientRegistrationData[
                FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                  .contactKey
              ]
            }
            requiredLength={
              UtilitiesKeys.getInputFieldLengthValidationKeys()
                .userContactNumberLength
            }
          />

          {/* Patient's Sex Text Field... */}
          <InputTextField
            label={
              FrontDeskUtilitiesKeys.getPatientRegistrationLabelKeys()
                .patientGenderKey
            }
            onChange={PatientDataChangeHandler}
            mappedKey={
              FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                .patientGenderKey
            }
            value={
              patientRegistrationData[
                FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                  .patientGenderKey
              ]
            }
          />

          {/* Patient's Date Of Birth Text Field... */}
          <Bdate
            value={
              patientRegistrationData[
                FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                  .dateOfBirthKey
              ]
            }
            onChange={patientBdateChangeHandler}
          />

          {/* Patient's Address Text Field... */}
          <InputTextField
            label={
              FrontDeskUtilitiesKeys.getPatientRegistrationLabelKeys()
                .addressKey
            }
            onChange={PatientDataChangeHandler}
            mappedKey={
              FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().addressKey
            }
            value={
              patientRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().addressKey
              ]
            }
          />

          {/* Patient's Pin Code Text Field... */}
          <InputNumericTextField
            label={
              FrontDeskUtilitiesKeys.getPatientRegistrationLabelKeys()
                .pinCodeKey
            }
            onChange={PatientDataChangeHandler}
            mappedKey={
              FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().pinCodeKey
            }
            value={
              patientRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().pinCodeKey
              ]
            }
            requiredLength={
              UtilitiesKeys.getInputFieldLengthValidationKeys()
                .userPinCodeLength
            }
          />

          <div>
            <MenuSubmitButton value="Register" />
            <MenuSubmitButton value="Cancel" onClick={cancelButtonHandler} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
