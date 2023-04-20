import React, { useState } from "react";
// import InputField from "../../../Components/Screens/UI Elements/MenuForm Elements/InputField";
import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
// import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";

const AddDoctor = (props) => {
  // const [doctorData, setDoctorData] = useState({
  //   userId: "",
  //   password: "",
  //   name: "",
  //   licId: "",
  //   contact: "",
  //   userId: "",
  //   docSpecialization: "",
  // });

  const [doctorData, setDoctorData] = useState(
    AdminUtilities.getCreateUserInitialData()
  );

  const registerDoctorResponseHandler = (doctorRegisterResponseData) => {
    if (doctorRegisterResponseData.errorMessage === null) {
      if (doctorRegisterResponseData.isDoctorRegisteredSuccessfully === true) {
        cleanDataAfterDoctorRegistrationHandler(
          doctorRegisterResponseData.registeredDoctorData
        );
      }
      if (doctorRegisterResponseData.isDoctorRegisteredSuccessfully === false) {
        showMessageBarAtTheBottom({
          [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
            "Some error occured. Please try again later.",
          [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
        });
      }
    } else if (doctorRegisterResponseData.registeredDoctorData === null) {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          doctorRegisterResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
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
    });
  };

  

  const AddDoctorDataHandler = (event) => {
    event.preventDefault();
    console.log(doctorData);

    //Validation for user contact number...
    const userContactNumberMappedKey =
    AdminUtilities.getCreateUserDataKeys().userContactKey;
    const userContactNumber = doctorData[userContactNumberMappedKey];
    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    //Show Alert Message in case of Invalid Contact Number...
    if (
      userContactNumber.length !== userContactNumberRequiredLength
    ) {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }

    AdminAPIHandler.registerDoctor({
      doctorData: doctorData,
      registerDoctorResponseHandler: registerDoctorResponseHandler,
    });
  };

  const BackButtonPressedHandler = () => {
    console.log("BackButtonPressedHandler");
    props.setAdminOption(AdminUtilities.getAdminMenuOptionsNameKeys().createDoctorKey);
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

          {/* UtilitiesKeys */}

          {/* User Contact Number Input Key for User Registration
          <InputTextField
            label={AdminUtilities.getCreateUserLabelKeys().doctorContactKey}
            mappedKey={AdminUtilities.getCreateUserDataKeys().userContactKey}
            onChange={updateDoctorData}
            value={
              doctorData[AdminUtilities.getCreateUserDataKeys().userContactKey]
            }
          /> */}

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
            <MenuSubmitButton
              value="Cancel"
              onClick={BackButtonPressedHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
