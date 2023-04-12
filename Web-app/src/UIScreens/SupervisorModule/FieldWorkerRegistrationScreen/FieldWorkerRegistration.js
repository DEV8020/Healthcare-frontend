import React, { useState } from "react";
import classes from "./FieldWorkerRegistration.module.css";
// import InputField from "../../../Components/Screens/UI Elements/MenuForm Elements/InputField";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FieldWorkerAPIHandler from "../../../Controllers/FieldWorkerAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
// import InputTextField from "../../../Component/InputTextField/InputTextField";
import SupervisorUtilitiesKeys from "../SupervisorUtilitiesKeys/SupervisorUtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputTextField from "../../../Component/InputTextField/InputTextField";

const FieldWorkerRegistration = (props) => {
  const [
    selectedDataFromFieldWorkerRegistration,
    setSelectedDataFromFieldWorkerRegistration,
  ] = useState(SupervisorUtilitiesKeys.getFieldWorkerRegistrationInitialData());
  // ] = useState({
  //   name: "",
  //   userId: "",
  //   password: "",
  //   contact: "",
  //   address: "",
  //   pincode: "",
  // });

  var setFieldWorkerData = (updateData) => {
    setSelectedDataFromFieldWorkerRegistration((fieldWorkerData) => {
      console.log(fieldWorkerData);
      console.log({ ...fieldWorkerData, ...updateData });
      return { ...fieldWorkerData, ...updateData };
    });
  };

  // const fieldWorkerUserIdChangeHandler = (event) => {
  //   setFieldWorkerData({ userId: event.target.value });
  //   console.log(selectedDataFromFieldWorkerRegistration);
  // };

  // const fieldWorkerNameChangeHandler = (event) => {
  //   setFieldWorkerData({ name: event.target.value });
  //   console.log(selectedDataFromFieldWorkerRegistration);
  // };

  // const fieldWorkerPasswordChangeHandler = (event) => {
  //   setFieldWorkerData({ password: event.target.value });
  //   console.log(selectedDataFromFieldWorkerRegistration);
  // };

  // const fieldWorkerContactChangeHandler = (event) => {
  //   setFieldWorkerData({ contact: event.target.value });
  //   console.log(selectedDataFromFieldWorkerRegistration);
  // };

  // const fieldWorkerAddressChangeHandler = (event) => {
  //   setFieldWorkerData({ address: event.target.value });
  //   console.log(selectedDataFromFieldWorkerRegistration);
  // };

  const AddFieldWorkerDataHandler = (event) => {
    event.preventDefault();

    console.log("selectedDataFromFieldWorkerRegistration");
    console.log(selectedDataFromFieldWorkerRegistration);

    //Validation for user contact number...
    const userContactNumber =
      selectedDataFromFieldWorkerRegistration[
        SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().contactKey
      ];
    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    //Show Alert Message in case of Invalid Contact Number...
    if (userContactNumber.length !== userContactNumberRequiredLength) {
      showMessageAtBottomBar({
        message:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
        isErrorMessage: false,
      });
      return;
    }

    //Validation for user Pin Code...
    const userAddressPinCode =
      selectedDataFromFieldWorkerRegistration[
        SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().pinCodeKey
      ];
    const userPinCodeRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    );
    //Show Alert Message in case of Invalid PIN CODE...
    if (userAddressPinCode.length !== userPinCodeRequiredLength) {
      showMessageAtBottomBar({
        message:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .pinCodeNotValidMessage,
        isErrorMessage: false,
      });
      return;
    }

    FieldWorkerAPIHandler.registerFieldWorker({
      fieldWorkerData: selectedDataFromFieldWorkerRegistration,
      registerNewFieldWorkerResponseCallBack:
        registerNewFieldWorkerResponseCallBack,
    });
  };

  const registerNewFieldWorkerResponseCallBack = (
    fieldWorkerRegistrationResponseData
  ) => {
    if (fieldWorkerRegistrationResponseData.isFieldWorkerRegistered === false) {
      showMessageAtBottomBar({
        message: fieldWorkerRegistrationResponseData.errorMessage,
        isErrorMessage: true,
      });
      return;
    }

    showMessageAtBottomBar({
      message: "Field Worker registered successfully.",
      isErrorMessage: false,
    });

    setSelectedDataFromFieldWorkerRegistration(
      SupervisorUtilitiesKeys.getFieldWorkerRegistrationInitialData()
    );

    // setSelectedDataFromFieldWorkerRegistration({
    //   name: "",
    //   userId: "",
    //   password: "",
    //   contact: "",
    //   address: "",
    // });
  };

  const showMessageAtBottomBar = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const cancelButtonHandler = () => {
    props.setSuperVisorOption("frontDesk");
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Register Field Worker</h1>

        <form id="addFieldWorker-form" onSubmit={AddFieldWorkerDataHandler}>
          {/* Field Worker User ID Input Text Field */}
          <InputTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .userIDKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .userIDKey
            }
            onChange={setFieldWorkerData}
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .userIDKey
              ]
            }
          />

          {/* <InputField
            type="text"
            label="FieldWorker UserId"
            value={selectedDataFromFieldWorkerRegistration.userId}
            onChange={fieldWorkerUserIdChangeHandler}
          /> */}

          {/* <InputField
            type="text"
            label="FieldWorker Password"
            value={selectedDataFromFieldWorkerRegistration.password}
            onChange={fieldWorkerPasswordChangeHandler}
          /> */}

          {/* Field Worker Password Input Text Field */}
          <InputTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .passwordKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .passwordKey
            }
            onChange={setFieldWorkerData}
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .passwordKey
              ]
            }
          />

          {/* <InputField
            type="text"
            label="FieldWorker Name"
            value={selectedDataFromFieldWorkerRegistration.name}
            onChange={fieldWorkerNameChangeHandler}
          /> */}

          {/* Field Worker Name Input Text Field */}
          <InputTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .nameKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .nameKey
            }
            onChange={setFieldWorkerData}
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .nameKey
              ]
            }
          />

          {/* <InputField
            type="text"
            label="Contact"
            value={selectedDataFromFieldWorkerRegistration.contact}
            onChange={fieldWorkerContactChangeHandler}
          /> */}

          {/* Field Worker Contact Number Input Text Field */}
          <InputNumericTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .contactKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .contactKey
            }
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .contactKey
              ]
            }
            onChange={setFieldWorkerData}
            requiredLength={
              UtilitiesKeys.getInputFieldLengthValidationKeys()
                .userContactNumberLength
            }
          />

          {/* <InputField
            type="text"
            label="Address"
            onChange={fieldWorkerAddressChangeHandler}
            value={selectedDataFromFieldWorkerRegistration.address}
          /> */}

          {/* Field Worker Address Input Text Field */}
          <InputTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .addressKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .addressKey
            }
            onChange={setFieldWorkerData}
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .addressKey
              ]
            }
          />

          {/* Field Worker Pin Code Input Text Field */}
          <InputNumericTextField
            label={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys()
                .pinCodeKey
            }
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                .pinCodeKey
            }
            onChange={setFieldWorkerData}
            value={
              selectedDataFromFieldWorkerRegistration[
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys()
                  .pinCodeKey
              ]
            }
            requiredLength={
              UtilitiesKeys.getInputFieldLengthValidationKeys()
                .userPinCodeLength
            }
          />

          {/* <InputTextField
            label={
                SupervisorUtilitiesKeys.getFieldWorkerRegistrationLabelKeys().pinCodeKey
            }
            onChange={setFieldWorkerData}
            mappedKey={
              SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().pinCodeKey
            }
            // value={
            //   patientRegistrationData[
            //     FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys()
            //       .patientGenderKey
            //   ]
            // }
          /> */}

          <div>
            <MenuSubmitButton value="Register" />
            <MenuSubmitButton value="Cancel" onClick={cancelButtonHandler} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldWorkerRegistration;
