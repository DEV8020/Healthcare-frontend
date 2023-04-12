import React, { useEffect, useState } from "react";
import classes from "./AddHospital.module.css";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";

const AddHospital = (props) => {
  //Initial Data for Hospital Registration...
  const hospitalRegistrationInitialData = {
    [UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey]: "",
    [UtilitiesKeys.getHospitalRegistrationDataKeys().addressKey]: "",
    [UtilitiesKeys.getHospitalRegistrationDataKeys().pinCodeKey]: "",
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

    //Validation for user Pin Code...
    const userPinCodeMappedKey =
      UtilitiesKeys.getCreateUserDataKeys().userAddressPinCodeKey;
    const hospitalAddressPinCode =
      hospitalRegistrationData[
        UtilitiesKeys.getHospitalRegistrationDataKeys().pinCodeKey
      ];
    const userPinCodeRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    );
    //Show Alert Message in case of Invalid PIN CODE...
    if (hospitalAddressPinCode.length !== userPinCodeRequiredLength) {
      showMessageAtBottomBar({
        message:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .pinCodeNotValidMessage,
        isErrorMessage: true,
      });
      return;
    }

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
      message:
        UtilitiesKeys.getHospitalRegistrationMessagesText().successMessage,
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
            label={UtilitiesKeys.getHospitalRegistrationFormLabelKeys().nameKey}
            onChange={HospitalDataChangeHandler}
            mappedKey={UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey}
            value={
              hospitalRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey
              ]
            }
          />

          <InputTextField
            type="text"
            label={
              UtilitiesKeys.getHospitalRegistrationFormLabelKeys().addressKey
            }
            onChange={HospitalDataChangeHandler}
            mappedKey={
              UtilitiesKeys.getHospitalRegistrationDataKeys().addressKey
            }
            value={
              hospitalRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().addressKey
              ]
            }
          />

          <InputNumericTextField
            label={
              UtilitiesKeys.getHospitalRegistrationFormLabelKeys().pinCodeKey
            }
            onChange={HospitalDataChangeHandler}
            mappedKey={
              UtilitiesKeys.getHospitalRegistrationDataKeys().pinCodeKey
            }
            value={
              hospitalRegistrationData[
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
            <MenuSubmitButton value="Back" onClick={BackButtonPressedHandler} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
