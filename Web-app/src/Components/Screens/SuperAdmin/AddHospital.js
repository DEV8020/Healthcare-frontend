import React, { useState } from "react";
import classes from "./AddHospital.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";


const AddHospital = (props) => {
  //#################### Use State Variables  ####################
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");

  //########################## Data Change Event Handler Methods  ##########################
  //Hospital Name Data Change Event Handler Method...
  const hospitalNameChangeHandler = (event) => {
    setHospitalName(event.target.value);
  };

  //Hospital Address Data Change Event Handler Method...
  const hospitalAddressChangeHandler = (event) => {
    setHospitalAddress(event.target.value);
  };
  //########################## Data Change Event Handler Methods Ends Here  ##########################

  const AddHospitalDataHandler = (event) => {
    event.preventDefault();
    const hospitalData = {
      name: hospitalName,
      address: hospitalAddress,
    };
    SuperAdminAPIHandler.AddHospitalData({
      hospitalData: hospitalData,
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

  // const showErrorMessageScreen = (errorMessage) => {
  //   props.setAlertMessage(errorMessage);
  //   props.setAlertFlag(true);
  // };

  const addHospitalSuccessHandler = () => {
    setHospitalName("");
    setHospitalAddress("");
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
          <InputField
            type="text"
            label="Hospital Name"
            onChange={hospitalNameChangeHandler}
            value={hospitalName}
          />

          <InputField
            type="text"
            label="Address"
            onChange={hospitalAddressChangeHandler}
            value={hospitalAddress}
          />

          <MenuSubmitButton value="Register" />
          <MenuSubmitButton value="Back" onClick={BackButtonPressedHandler} />
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
