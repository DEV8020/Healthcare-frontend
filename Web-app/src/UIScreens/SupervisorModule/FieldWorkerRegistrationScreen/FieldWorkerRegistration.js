import React, { useState } from "react";
import classes from "./FieldWorkerRegistration.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import FieldWorkerAPIHandler from "../../../Controllers/FieldWorkerAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import SupervisorUtilitiesKeys from "../../../Utilities/SupervisorUtilitiesKeys/SupervisorUtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputTextField from "../../../Component/InputTextField/InputTextField";

const FieldWorkerRegistration = (props) => {
  const [
    selectedDataFromFieldWorkerRegistration,
    setSelectedDataFromFieldWorkerRegistration,
  ] = useState(SupervisorUtilitiesKeys.getFieldWorkerRegistrationInitialData());

  var setFieldWorkerData = (updateData) => {
    setSelectedDataFromFieldWorkerRegistration((fieldWorkerData) => {
      console.log(fieldWorkerData);
      console.log({ ...fieldWorkerData, ...updateData });
      return { ...fieldWorkerData, ...updateData };
    });
  };

  const AddFieldWorkerDataHandler = (event) => {
    event.preventDefault();

    console.log("selectedDataFromFieldWorkerRegistration");
    console.log(selectedDataFromFieldWorkerRegistration);



    const userValidationData =
    SupervisorUtilitiesKeys.checkFieldWorkerValidationData(selectedDataFromFieldWorkerRegistration, false);

  if (
    userValidationData[
      UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
    ] === true
  ) {
    showMessageAtBottomBar(userValidationData);
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
  };

  // const showMessageAtBottomBar = (prop) => {
  //   console.log(prop);
  //   props.showBottomMessageBar({
  //     [UtilitiesMethods.getErrorMessageKey()]:
  //       prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
  //       [UtilitiesMethods.getIsMessageErrorMessageKey()]:
  //       prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
  //   });
  // };

  const showMessageAtBottomBar = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesMethods.getErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesMethods.getIsMessageErrorMessageKey()]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageType],
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

          <div>
            <MenuSubmitButton value="Register" />
            {/* <MenuSubmitButton value="Cancel" onClick={cancelButtonHandler} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldWorkerRegistration;
