import React, { useState } from "react";
import classes from "./PatientRegistration.module.css";
import Bdate from "../../../Components/Screens/UI Elements/Date Element/Bdate";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import FrontDeskUtilitiesKeys from "../../../Utilities/FrontDeskUtilitiesKeys/FrontDeskUtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UserGenderTypeSelection from "../../../Component/LoginModule/UserGenderTypeSelection/UserGenderTypeSelection";
import FrontDeskUtilitiesMethods from "../../../Utilities/FrontDeskUtilitiesKeys/FrontDeskUtilitiesMethods";

const PatientRegistration = (props) => {
  const [patientRegistrationData, setPatientRegistrationData] = useState(
    FrontDeskUtilitiesKeys.getPatientRegistrationInitialData()
  );

  const today = new Date();
  const maxDate = today.toISOString().substring(0, 10);

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

    const userValidationData =
      FrontDeskUtilitiesMethods.checkPatientRegistrationValidationData(
        patientRegistrationData
      );

    if (
      userValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      showMessageAtBottomBar(userValidationData);
      return;
    }

    // //####################### Patient's Contact Number Validation #######################

    // //Validation for user contact number...
    // const userContactNumber =
    //   patientRegistrationData[
    //     FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().contactKey
    //   ];
    // const userContactNumberRequiredLength = parseInt(
    //   UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    // );

    // console.log(patientRegistrationData);

    // console.log(userContactNumber);

    // //Show Alert Message in case of Invalid Contact Number...
    // if (userContactNumber.length !== userContactNumberRequiredLength) {
    //   showErrorMessageScreen(
    //     UtilitiesKeys.getGeneralValidationMessagesText()
    //       .phoneNumberNotValidMessage,
    //     true,
    //     UtilitiesKeys.getAlertMessageTypeKeys().errorKey
    //   );
    //   return;
    // }

    // //####################### Patient's Pin Code Validation #######################

    // //Validation for user Pin Code...
    // const userPinCodeMappedKey =
    //   FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().pinCodeKey;
    // // const patientAddressPinCode = patientRegistrationData[userPinCodeMappedKey];
    // const userPinCodeRequiredLength = parseInt(
    //   UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    // );

    // console.log("******************************");
    // console.log(patientRegistrationData);
    // console.log(userPinCodeMappedKey);

    // //Show Alert Message in case of Invalid PIN CODE...
    // if (
    //   patientRegistrationData[userPinCodeMappedKey].length !==
    //   userPinCodeRequiredLength
    // ) {
    //   showErrorMessageScreen(
    //     UtilitiesKeys.getGeneralValidationMessagesText().pinCodeNotValidMessage,
    //     true,
    //     UtilitiesKeys.getAlertMessageTypeKeys().errorKey
    //   );
    //   return;
    // }

    //Front Desk : Register New Patient API call...
    FrontDeskAPIHandler.RegisterNewPatientAPICall({
      patientData: patientRegistrationData,
      registerNewPatientResponseCallBack: registerNewPatientResponseCallBack,
    });
  };

  const showErrorMessageScreen = (errorMessage, isError, messageType) => {
    props.showMessageBarAtTheBottom({
      [UtilitiesMethods.getErrorMessageKey()]: errorMessage,
      [UtilitiesMethods.getIsMessageErrorMessageKey()]: isError,
      [UtilitiesMethods.getMessageTypeKey()]: messageType,
    });
  };

  const showMessageAtBottomBar = (prop) => {
    props.showMessageBarAtTheBottom(prop);
  };

  const registerNewPatientResponseCallBack = (newPatientResponseData) => {
    console.log("registerNewPatientResponseHandler response is ");
    console.log(newPatientResponseData);

    if (newPatientResponseData.isNewPatientAdded === true) {
      showErrorMessageScreen(
        patientRegistrationData[
          FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().nameKey
        ] + " has been registered successfully.",
        false,
        UtilitiesKeys.getAlertMessageTypeKeys().successKey
      );
      resetPatientDataAfterRegister();
    } else {
      showErrorMessageScreen(
        newPatientResponseData.errorMessage,
        true,
        UtilitiesKeys.getAlertMessageTypeKeys().errorKey
      );
    }
  };

  const resetPatientDataAfterRegister = () => {
    const selectedGender =
      patientRegistrationData[
        FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().patientGenderKey
      ];

    console.log("*******************************************");
    console.log({
      ...FrontDeskUtilitiesKeys.getPatientRegistrationInitialData(),
      ...{
        [FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
          .patientGenderKey]: selectedGender,
      },
    });

    PatientDataChangeHandler({
      ...FrontDeskUtilitiesKeys.getPatientRegistrationInitialData(),
      ...{
        [FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
          .patientGenderKey]: selectedGender,
      },
    });
  };

  const registerUserGenderTypeChangeHandler = (event) => {
    PatientDataChangeHandler({
      [FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
        .patientGenderKey]: event.target.value,
    });
  };

  const superAdminUserType = [{ option: "Male" }, { option: "Female" }];

  const cancelButtonHandler = () => {
    props.setFrontDeskOption(
      FrontDeskUtilitiesKeys.getFrontDeskMenuOptionsNameKeys()
        .patientRegistrationKey
    );
  };

  return (
    <div>
      <div className={classes.center}>
        <h2> Register Patient</h2>

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
          {/* <UserTypeSelection */}
          <UserGenderTypeSelection
            label={
              patientRegistrationData[
                FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                  .patientGenderKey
              ]
            }
            options={superAdminUserType}
            onChange={registerUserGenderTypeChangeHandler}
          />

          {/* {/* Patient's Sex Text Field... */}
          {/* <InputTextField 
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
          /> */}

          {/* Patient's Date Of Birth Text Field... */}
          <Bdate
            value={
              patientRegistrationData[
                FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
                  .dateOfBirthKey
              ]
            }
            maxDate={maxDate}
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

          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              width: "95%",
              textAlign: "right",
            }}
          >
            <MenuSubmitButton value="Register" />
            {/* <MenuSubmitButton value="Cancel" onClick={cancelButtonHandler} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
