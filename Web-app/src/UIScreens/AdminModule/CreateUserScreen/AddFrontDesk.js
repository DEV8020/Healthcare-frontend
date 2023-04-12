//----------------------------------------------------------------- Imported files ------------------------------------------------------------------------

import React, { useState } from "react";

//----------------------------------------------------------------- API Service ------------------------------------------------------------------------

import AddFrontDeskService from "../../../Services/AddFrontDeskService";
//----------------------------------------------------------------- UI Elements ------------------------------------------------------------------------

import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

//----------------------------------------------------------------- CSS File --------------------------------------------------------------------------------

import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

//----------------------------------------------------------------- Component Function ------------------------------------------------------------------------

const AddFrontDesk = (props) => {
  //----------------------------------------------------------------- Input Variables ------------------------------------------------------------------------

  const [frontDeskRegistrationData, setFrontDeskRegistrationData] = useState({
    userId: "",
    password: "",
    name: "",
  });

  const updateFrontDeskRegistrationData = (dataToUpdate) => {
    setFrontDeskRegistrationData((frontDeskData) => {
      console.log({ ...frontDeskData, ...dataToUpdate });
      return { ...frontDeskData, ...dataToUpdate };
    });
  };

  //########################## Data Change Event Handler Methods  ##########################
  //Front Desk Name Data Change Event Handler Method...
  const frontDeskNameChangeHandler = (event) => {
    updateFrontDeskRegistrationData({ name: event.target.value });
  };

  //Front Desk User Id Data Change Event Handler Method...
  const frontDeskUserIdChangeHandler = (event) => {
    updateFrontDeskRegistrationData({ userId: event.target.value });
  };

  //Front Desk Password Data Change Event Handler Method...
  const frontDeskPasswordChangeHandler = (event) => {
    updateFrontDeskRegistrationData({ password: event.target.value });
  };
  //########################## Data Change Event Handler Methods Ends Here  ##########################


  const AddFrontDeskDataHandler = (event) => {
    event.preventDefault();
    AdminAPIHandler.registerFrontDesk({
      frontDeskData: frontDeskRegistrationData,
      registerFrontDeskResponseHandler: registerFrontDeskResponseHandler,
    });
  };

  const registerFrontDeskResponseHandler = (frontDeskRegistrationData) => {
    if (frontDeskRegistrationData.errorMessage === null) {
      if (
        frontDeskRegistrationData.isFrontDeskRegisteredSuccessfully === true
      ) {
        cleanDataAfterFrontDeskRegistrationHandler(
          frontDeskRegistrationData.registeredFrontDeskData
        );
      }
      if (
        frontDeskRegistrationData.isFrontDeskRegisteredSuccessfully === false
      ) {
        showMessageBarAtTheBottom({
          message: "Some error occured. Please try again later.",
          isErrorMessage: true,
        });
      }
    } else if (frontDeskRegistrationData.registeredDoctorData === null) {
      showMessageBarAtTheBottom({
        message: frontDeskRegistrationData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const showMessageBarAtTheBottom = (propData) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: propData.message,
      isErrorMessage: propData.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const cleanDataAfterFrontDeskRegistrationHandler = () => {
    showMessageBarAtTheBottom({
      message: "Front Desk registered successfully.",
      isErrorMessage: true,
    });

    setFrontDeskRegistrationData({
      userId: "",
      password: "",
      name: "",
    });
    props.refreshUsersListResponseHandler();
    BackButtonPressedHandler();
  };

  const BackButtonPressedHandler = () => {
    props.setAdminOption("");
  };

  //----------------------------------------------------------------- JSX Code ------------------------------------------------------------------------

  return (
    <div>
      <div className={classes.center}>
        <h1> Add FrontDesk Menu</h1>

        <form id="addFD-form" onSubmit={AddFrontDeskDataHandler}>
          <InputField
            type="text"
            label="FrontDesk Name"
            onChange={frontDeskNameChangeHandler}
            value={frontDeskRegistrationData.name}
          />

          {/* <InputField
            type="text"
            label="Contact Number"
            onChange={frontDeskContactChangeHandler}
          /> */}
          <InputField
            type="text"
            label="FrontDesk User Id"
            onChange={frontDeskUserIdChangeHandler}
            value={frontDeskRegistrationData.userId}
          />

          <InputField
            type="text"
            label="Password"
            onChange={frontDeskPasswordChangeHandler}
            value={frontDeskRegistrationData.password}
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

export default AddFrontDesk;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
