import { useState } from "react";
import classes from "./UnAssignedFollowUpCell.module.css";
import SmallInputField from "../UI Elements/MenuForm Elements/SmallInputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const UnAssignedFollowUpCell = (props) => {
  const [patientUnassignedFollowUpData, setPatientUnassignedFollowUpData] =
    useState(props.unassignedFollowUpData);

  const FieldWorkerIdChangeHandler = (unassignedFollowUpData, event) => {
    setPatientUnassignedFollowUpData((patientData) => {
      console.log({ ...patientData, ...{ fieldWorkerID: event.target.value } });
      return { ...patientData, ...{ fieldWorkerID: event.target.value } };
    });
  };

  const AssignFollowUpHandler = (unassignedFollowUpData) => {
    console.log("FieldWorkerIdChangeHandler");
    console.log(unassignedFollowUpData);

    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        unassignedFollowUpData.fieldWorkerID
      ) === 0
    ) {
      props.showMessageAtBottomBar({
        message:
          "Please enter field worker Id to proceed. It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }
    props.AssignFollowUpHandler(unassignedFollowUpData);
  };

  return (
    <div
      key={patientUnassignedFollowUpData.patientId}
      className={classes.plist}
    >
      <div>Name : {patientUnassignedFollowUpData.name}</div>
      <div>Age : {patientUnassignedFollowUpData.age}</div>
      <div>Sex : {patientUnassignedFollowUpData.sex}</div>
      <div>Contact : {patientUnassignedFollowUpData.contact}</div>

      <SmallInputField
        type="text"
        label="Field Worker Id"
        id={patientUnassignedFollowUpData.patientId}
        onChange={(event) =>
          FieldWorkerIdChangeHandler(patientUnassignedFollowUpData, event)
        }
        value = {patientUnassignedFollowUpData.fieldWorkerID}
      />
      <AddButton
        value="Assign Follow ups"
        onClick={() => AssignFollowUpHandler(patientUnassignedFollowUpData)}
      />
    </div>
  );
};

export default UnAssignedFollowUpCell;
