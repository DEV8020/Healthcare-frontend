import React, { useState } from "react";
// import RegisterFieldWorkerService from "../../../Services/RegisterFieldWorkerService";
import classes from "./FieldWorkerRegistration.module.css";
import InputField from "../UI Elements/MenuForm Elements/InputField";
// import AddButton from "../UI Elements/MenuForm Elements/addButton";
import Bdate from "../UI Elements/Date Element/Bdate";
import TextBox from "../UI Elements/MenuForm Elements/TextBox";
// import RadioButton from "../UI Elements/MenuForm Elements/RadioButton";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";
// import SuperVisorAPIHandler from "../../../Controllers/SuperVisorAPIHandler";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";

const FieldWorkerRegistration = (props) => {
  const [fieldWorkerName, setFieldWorkerName] = useState("");
  const [fieldWorkerAddress, setFieldWorkerAddress] = useState("");
  const [fieldWorkerContactNo, setFieldWorkerContactNo] = useState("");
  const [fieldWorkerBdate, setFieldWorkerBdate] = useState("");
  const [fieldWorkerSex, setFieldWorkerSex] = useState("");

  const fieldWorkerNameChangeHandler = (event) => {
    setFieldWorkerName(event.target.value);
  };
  const fieldWorkerAddressChangeHandler = (event) => {
    setFieldWorkerAddress(event.target.value);
  };

  const fieldWorkerContactNoChangeHandler = (event) => {
    setFieldWorkerContactNo(event.target.value);
  };

  const fieldWorkerSexChangeHandler = (event) => {
    setFieldWorkerSex(event.target.value);
  };

  const fieldWorkerBdateChangeHandler = (event) => {
    setFieldWorkerBdate(event.target.value);
  };

  const AddFieldWorkerDataHandler = (event) => {
    event.preventDefault();

    const fieldWorkerData = {
      name: fieldWorkerName,
      address: fieldWorkerAddress,
      contact: fieldWorkerContactNo,
      sex: fieldWorkerSex,
      age: "22",
      // age: fieldWorkerBdate,
    };

    SupervisorAPIHandler.RegisterNewFieldWorkerAPICall({
      fieldWorkerData: fieldWorkerData,
      registerNewFieldWorkerResponseCallBack:
        registerNewFieldWorkerResponseCallBack,
    });
  };

  const showErrorMessageScreen = (errorMessage, isError) => {
    console.log(isError);
    props.setAlertMessage(errorMessage);
    props.setAlertFlag(true);
  };

  const registerNewFieldWorkerResponseCallBack = (
    newFieldWorkerResponseData
  ) => {
    console.log("registerNewFieldWorkerResponseHandler response is ");
    console.log(newFieldWorkerResponseData);

    if (newFieldWorkerResponseData.errorMessage === null) {
      if (newFieldWorkerResponseData.isNewFieldWorkerAdded === true) {
        showErrorMessageScreen(
          fieldWorkerName + " has been registered successfully.",
          false
        );
        resetFieldWorkerDataAfterRegister();
      }
      if (newFieldWorkerResponseData.isNewFieldWorkerAdded === false) {
        showErrorMessageScreen(
          "Some error occured. Please try again later.",
          true
        );
      }
    } else if (newFieldWorkerResponseData.isNewFieldWorkerAdded === null) {
      showErrorMessageScreen(newFieldWorkerResponseData.errorMessage, true);
    }
  };

  const resetFieldWorkerDataAfterRegister = () => {
    setFieldWorkerName("");
    setFieldWorkerContactNo("");
    setFieldWorkerSex("");
    setFieldWorkerAddress("");
    setFieldWorkerBdate("");
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
            label="FieldWorker Name"
            value={fieldWorkerName}
            onChange={fieldWorkerNameChangeHandler}
          />

          <InputField
            type="text"
            label="Contact Number"
            value={fieldWorkerContactNo}
            onChange={fieldWorkerContactNoChangeHandler}
          />

          <InputField
            type="text"
            label="Sex"
            value={fieldWorkerSex}
            onChange={fieldWorkerSexChangeHandler}
          />

          {/* <RadioButton heading="Gender" label1="Male" label2="Female" label3="Other" onChange={fieldWorkerSexChangeHandler}/> */}

          <Bdate
            value={fieldWorkerBdate}
            onChange={fieldWorkerBdateChangeHandler}
          />
          {/* <InputField
            type="text"
            label="DOB"
            value={fieldWorkerBdate}
            onChange={fieldWorkerBdateChangeHandler}
          /> */}
          <TextBox.TextBox
            type="text"
            label="Address"
            value={fieldWorkerAddress}
            onChange={fieldWorkerAddressChangeHandler}
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
