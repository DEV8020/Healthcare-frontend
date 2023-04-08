import React, { useState } from "react";
import classes from "./FieldWorkerRegistration.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import FieldWorkerAPIHandler from "../../../Controllers/FieldWorkerAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const FieldWorkerRegistration = (props) => {
  const [
    selectedDataFromFieldWorkerRegistration,
    setSelectedDataFromFieldWorkerRegistration,
  ] = useState({
    name: "",
    userId: "",
    password: "",
    contact: "",
    address: "",
  });

  var setFieldWorkerData = (updateData) => {
    setSelectedDataFromFieldWorkerRegistration((fieldWorkerData) => {
      return { ...fieldWorkerData, ...updateData };
    });
  };

  const fieldWorkerUserIdChangeHandler = (event) => {
    setFieldWorkerData({ userId: event.target.value });
    console.log(selectedDataFromFieldWorkerRegistration);
  };

  const fieldWorkerNameChangeHandler = (event) => {
    setFieldWorkerData({ name: event.target.value });
    console.log(selectedDataFromFieldWorkerRegistration);
  };

  const fieldWorkerPasswordChangeHandler = (event) => {
    setFieldWorkerData({ password: event.target.value });
    console.log(selectedDataFromFieldWorkerRegistration);
  };

  const fieldWorkerContactChangeHandler = (event) => {
    setFieldWorkerData({ contact: event.target.value });
    console.log(selectedDataFromFieldWorkerRegistration);
  };

  const fieldWorkerAddressChangeHandler = (event) => {
    setFieldWorkerData({ address: event.target.value });
    console.log(selectedDataFromFieldWorkerRegistration);
  };

  const AddFieldWorkerDataHandler = (event) => {
    event.preventDefault();

    console.log("selectedDataFromFieldWorkerRegistration");
    console.log(selectedDataFromFieldWorkerRegistration);

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

    setSelectedDataFromFieldWorkerRegistration({
      name: "",
      userId: "",
      password: "",
      contact: "",
      address: "",
    });
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
        <h1> Register FieldWorker</h1>

        <form id="addFieldWorker-form" onSubmit={AddFieldWorkerDataHandler}>
          <InputField
            type="text"
            label="FieldWorker UserId"
            value={selectedDataFromFieldWorkerRegistration.userId}
            onChange={fieldWorkerUserIdChangeHandler}
          />

          <InputField
            type="text"
            label="FieldWorker Password"
            value={selectedDataFromFieldWorkerRegistration.password}
            onChange={fieldWorkerPasswordChangeHandler}
          />

          <InputField
            type="text"
            label="FieldWorker Name"
            value={selectedDataFromFieldWorkerRegistration.name}
            onChange={fieldWorkerNameChangeHandler}
          />

          <InputField
            type="text"
            label="Contact"
            value={selectedDataFromFieldWorkerRegistration.contact}
            onChange={fieldWorkerContactChangeHandler}
          />

          <InputField
            type="text"
            label="Address"
            onChange={fieldWorkerAddressChangeHandler}
            value={selectedDataFromFieldWorkerRegistration.address}
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

export default FieldWorkerRegistration;
