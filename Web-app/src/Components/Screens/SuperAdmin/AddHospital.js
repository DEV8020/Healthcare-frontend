import React, { useState } from "react";
import classes from "./AddHospital.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import InputTextField from "../../../Component/InputTextField/InputTextField";

const AddHospital = (props) => {
  //Initial Data for our Hospital Data...
  const hospitalRegistrationInitialData = {
    name: "",
    address: "",
  };

  //########################## Use State Variables  ##########################
  const [hospitalRegistrationData, setHospitalRegistrationData] = useState(
    hospitalRegistrationInitialData
  );

  //########################## Data Change Event Handler Methods  ##########################

  //Single Data Handler for Input TextField change...
  const HospitalDataChangeHandler = (prop) => {
    setHospitalRegistrationData((hospitalData) => {
      return { ...hospitalData, ...prop };
    });
  };

  //########################## Data Change Event Handler Methods Ends Here  ##########################

  const AddHospitalDataHandler = (event) => {
    event.preventDefault();

    SuperAdminAPIHandler.AddHospitalData({
      hospitalData: hospitalRegistrationData,
      addHospitalResponseHandler: addHospitalResponseHandler,
    });
  };

  const addHospitalResponseHandler = (hospitalData) => {
    if (hospitalData.isHospitalAdded === true) {
      addHospitalSuccessHandler();
    } else if (hospitalData.isHospitalAdded === false) {
      showMessageAtBottomBar({
        message: hospitalData.errorMessage,
        isErrorMessage: true,
      });
    }
  };

  const showMessageAtBottomBar = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  const addHospitalSuccessHandler = () => {
    setHospitalRegistrationData(hospitalRegistrationInitialData);
    showMessageAtBottomBar({
      message: "Hospital Added Successfully.",
      isErrorMessage: true,
    });
  };

  const BackButtonPressedHandler = () => {
    props.setSuperAdminOption("");
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Hospital Menu</h1>

        <form id="addHospital-form" onSubmit={AddHospitalDataHandler}>
          <InputTextField
            type="text"
            label="Hospital Name"
            onChange={HospitalDataChangeHandler}
            mappedKey="name"
            value={hospitalRegistrationData.name}
          />

          <InputTextField
            type="text"
            label="Hospital Address"
            onChange={HospitalDataChangeHandler}
            mappedKey="address"
            value={hospitalRegistrationData.address}
          />

          <MenuSubmitButton value="Register" />
          <MenuSubmitButton value="Back" onClick={BackButtonPressedHandler} />
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
