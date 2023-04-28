import React, { useState } from "react";
import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";

const AddDoctor = (props) => {
  const [doctorData, setDoctorData] = useState(
    AdminUtilities.getCreateUserInitialData()
  );

  const registerDoctorResponseHandler = (doctorRegisterResponseData) => {

    if (doctorRegisterResponseData.isDoctorRegisteredSuccessfully === true) {
      cleanDataAfterDoctorRegistrationHandler(
        doctorRegisterResponseData.registeredDoctorData
      );
    } else {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        doctorRegisterResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
  };

  const updateDoctorData = (doctorDataToUpdate) => {
    console.log(doctorDataToUpdate);
    setDoctorData((doctorData) => {
      return { ...doctorData, ...doctorDataToUpdate };
    });
  };

  const cleanDataAfterDoctorRegistrationHandler = (doctorData) => {
    showMessageBarAtTheBottom({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Doctor registered successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    });
    setDoctorData(AdminUtilities.getCreateUserInitialData());
    props.refreshUsersListResponseHandler();
    BackButtonPressedHandler();
  };

  //Message Bar At The Bottom to display messages...
  const showMessageBarAtTheBottom = (propData) => {
    props.showMessageAtBottomBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        propData[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        propData[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        propData[UtilitiesKeys.getErrorMessageDataKeys().messageType],
    });
  };

  const AddDoctorDataHandler = (event) => {
    event.preventDefault();
    console.log(doctorData);

    const userValidationData =
      AdminUtilities.checkAddDoctorDataValidations(doctorData, false);

    if (
      userValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      showMessageBarAtTheBottom(userValidationData);
      return;
    }

    AdminAPIHandler.registerDoctor({
      doctorData: doctorData,
      registerDoctorResponseHandler: registerDoctorResponseHandler,
    });
  };

  const BackButtonPressedHandler = () => {
    console.log("BackButtonPressedHandler");
    props.setAdminOption(
      AdminUtilities.getAdminMenuOptionsNameKeys().createDoctorKey
    );
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Doctor Menu</h1>

        <form id="addDoctor-form" onSubmit={AddDoctorDataHandler}>
          {/* User ID Input Key for User Registration */}
          <InputTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorUserIDKey}
            mappedKey={AdminUtilities.getCreateUserDataKeys().userIDKey}
            onChange={updateDoctorData}
            value={doctorData[AdminUtilities.getCreateUserDataKeys().userIDKey]}
          />

          {/* User Name Input Key for User Registration */}
          <InputTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorNameKey}
            mappedKey={AdminUtilities.getCreateUserDataKeys().userNameKey}
            onChange={updateDoctorData}
            value={
              doctorData[AdminUtilities.getCreateUserDataKeys().userNameKey]
            }
          />

          {/* User Password Input Key for User Registration */}
          <InputTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorPasswordKey}
            mappedKey={AdminUtilities.getCreateUserDataKeys().userPasswordKey}
            onChange={updateDoctorData}
            value={
              doctorData[AdminUtilities.getCreateUserDataKeys().userPasswordKey]
            }
          />

          {/* <InputNumericTextField */}
          <InputNumericTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorContactKey}
            mappedKey={AdminUtilities.getCreateUserDataKeys().userContactKey}
            value={
              doctorData[AdminUtilities.getCreateUserDataKeys().userContactKey]
            }
            onChange={updateDoctorData}
            requiredLength={
              UtilitiesKeys.getInputFieldLengthValidationKeys()
                .userContactNumberLength
            }
          />

          {/* Doctor License ID Number Input Key for Doctor Registration */}
          <InputTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorLicenseIDKey}
            mappedKey={
              AdminUtilities.getCreateUserDataKeys().doctorLicenseIDKey
            }
            onChange={updateDoctorData}
            value={
              doctorData[
                AdminUtilities.getCreateUserDataKeys().doctorLicenseIDKey
              ]
            }
          />

          {/* Doctor Specialization Input Key for Doctor Registration */}
          <InputTextField
            label={
              AdminUtilities.getCreateUserLabelKeys().doctorSpecializationKey
            }
            mappedKey={
              AdminUtilities.getCreateUserDataKeys().doctorSpecializationKey
            }
            onChange={updateDoctorData}
            value={
              doctorData[
                AdminUtilities.getCreateUserDataKeys().doctorSpecializationKey
              ]
            }
          />

          <div>
            <MenuSubmitButton value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
