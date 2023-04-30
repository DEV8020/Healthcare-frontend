import React, { useState } from "react";
import classes from "./AddHospital.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import InputNumericTextField from "../../../Component/InputNumber/InputNumericTextField";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";

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

  //########################## Add Hospital Button Click Event  ##########################

  //Add Hospital Button Click Event Handler...
  const AddHospitalDataHandler = (event) => {
    event.preventDefault();

    const hospitalValidationData =
      SuperAdminUtilitiesKeys.checkAddHospitalDataValidations(
        hospitalRegistrationData
      );

    if (
      hospitalValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      props.showBottomMessageBar(hospitalValidationData);
      return;
    }

    //Hitting API after validations for ADDING HOSPITAL...
    SuperAdminAPIHandler.AddHospitalData({
      hospitalData: hospitalRegistrationData,
      addHospitalResponseHandler: addHospitalResponseHandler,
    });
  };

  //############# API Response Handler Methods  #############

  //Handle ADD HOSPITAL API Response...
  const addHospitalResponseHandler = (hospitalData) => {
    if (hospitalData.isHospitalAdded === true) {
      addHospitalSuccessHandler();
    } else if (hospitalData.isHospitalAdded === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          hospitalData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
    }
  };

  //Method for Successfully Added Hospital Response...
  const addHospitalSuccessHandler = () => {
    setHospitalRegistrationData(hospitalRegistrationInitialData);
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        UtilitiesKeys.getHospitalRegistrationMessagesText().successMessage,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    });
  };

  //############# API Response Handler Methods Ends Here #############

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Hospital Menu</h1>

        <form id="addHospital-form" onSubmit={AddHospitalDataHandler}>
          {/* Hospital Name Input Key for Hospital Registration */}
          <InputTextField
            type="text"
            label={
              SuperAdminUtilitiesKeys.getHospitalRegistrationFormLabelKeys()
                .nameKey
            }
            onChange={HospitalDataChangeHandler}
            mappedKey={UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey}
            value={
              hospitalRegistrationData[
                UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey
              ]
            }
          />

          {/* Hospital Address Input Key for Hospital Registration */}
          <InputTextField
            type="text"
            label={
              SuperAdminUtilitiesKeys.getHospitalRegistrationFormLabelKeys()
                .addressKey
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

          {/* Hospital Pin Code Input Key for Hospital Registration */}
          <InputNumericTextField
            label={
              SuperAdminUtilitiesKeys.getHospitalRegistrationFormLabelKeys()
                .pinCodeKey
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
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              width: "100%",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <MenuSubmitButton value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
