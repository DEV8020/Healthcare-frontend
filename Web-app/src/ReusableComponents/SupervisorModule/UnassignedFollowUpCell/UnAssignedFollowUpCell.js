import { useState } from "react";
import classes from "./UnAssignedFollowUpCell.module.css";
import SmallInputField from "../../../Components/Screens/UI Elements/MenuForm Elements/SmallInputField";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const UnAssignedFollowUpCell = (props) => {
  const [patientUnassignedFollowUpData, setPatientUnassignedFollowUpData] =
    useState(props.unassignedFollowUpData);

  const FieldWorkerIdChangeHandler = (event) => {
    setPatientUnassignedFollowUpData((patientData) => {
      console.log({ ...patientData, ...{ fieldWorkerID: event.target.value } });
      return { ...patientData, ...{ fieldWorkerID: event.target.value } };
    });
  };

  const AssignFollowUpHandler = () => {
    console.log("FieldWorkerIdChangeHandler");
    console.log(patientUnassignedFollowUpData);

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        patientUnassignedFollowUpData.fieldWorkerID
      ) === 0
    ) {
      props.showMessageAtBottomBar({
        message:
          "Please enter field worker Id to proceed. It can't be left blank.",
        isErrorMessage: true,
        [UtilitiesMethods.getMessageTypeKey()]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
      return;
    }
    props.AssignFollowUpHandler(patientUnassignedFollowUpData);
  };

  return (
    <div
      key={patientUnassignedFollowUpData.patientId}
      className={classes.plist}
    >
      <div>Name : {patientUnassignedFollowUpData.name}</div>
      <div>Age : {patientUnassignedFollowUpData.age}</div>
      <div>Sex : {patientUnassignedFollowUpData.sex}</div>
      {/* <div>Contact : {patientUnassignedFollowUpData.contact}</div> */}

      <SmallInputField
        type="text"
        label="Field Worker Id"
        id={patientUnassignedFollowUpData.patientId}
        onChange={FieldWorkerIdChangeHandler}
        value={patientUnassignedFollowUpData.fieldWorkerID}
        key={patientUnassignedFollowUpData.patientId}
      />
      <AddButton value="Assign Follow ups" onClick={AssignFollowUpHandler} />
    </div>
  );
};

export default UnAssignedFollowUpCell;
