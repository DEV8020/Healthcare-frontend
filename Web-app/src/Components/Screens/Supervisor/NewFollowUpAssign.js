import React, { useEffect, useState } from "react";

// import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewFollowUpAssign.module.css";
import SmallInputField from "../UI Elements/MenuForm Elements/SmallInputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
// import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";

const NewFollowUpAssign = (props) => {
  // const [fieldWorkerId, setFieldWorkerId] = useState([""]);
  const [unAssignedFollowUpsData, setUnAssignedFollowUpsData] = useState([]);
  const [fieldWorkerIDField, setFieldWorkerIDField] = useState("");

  console.log("NewFollowUpAssign NewFollowUpAssign called");
  console.log(unAssignedFollowUpsData.count);
  console.log(unAssignedFollowUpsData.length);

  useEffect(() => {
    SupervisorAPIHandler.GetUnassignedPatientListAPICall({
      getUnassignedFollowUpsAPIHandler: getUnassignedFollowUpsAPIHandler,
    });
  }, []);

  const getUnassignedFollowUpsAPIHandler = (unAssignedFollowUpsData) => {
    console.log(
      "getUnassignedFollowUpsAPIHandler getUnassignedFollowUpsAPIHandler"
    );
    console.log(unAssignedFollowUpsData.UnAssignedFollowUpData);
    setUnAssignedFollowUpsData(unAssignedFollowUpsData.UnAssignedFollowUpData);

    const modifiedData = unAssignedFollowUpsData.UnAssignedFollowUpData.map(
      (patientData) => {
        return { ...patientData, ...{ fieldWorkerID: "" } };
      }
    );

    console.log("modifiedData");
    setUnAssignedFollowUpsData(modifiedData);
  };

  const FieldWorkerIdChangeHandler = (unassignedFollowUpData, event) => {
    console.log("unassignedFollowUpData");
    console.log(unassignedFollowUpData);
    // const values = [...fieldWorkerId];
    // values[index] = event.target.value;
    // setFieldWorkerId(values);
    // console.log(event.target.value);
    // console.log(event);
    // setFieldWorkerIDField(event.target.value);

    // const value = unassignedFollowUpData.fieldWorkerID + event.target.value;
    unassignedFollowUpData.fieldWorkerID = event.target.value;
    // console.log(unassignedFollowUpData);
  };

  const AssignFollowUpHandler = (unassignedFollowUpData) => {
    console.log("AssignFollowUpHandler");
    console.log(unassignedFollowUpData);

    if (UtilitiesMethods.getSpaceTrimmedLenght(unassignedFollowUpData.fieldWorkerID
      ) === 0) {
      props.showMessageAtBottomBar({
        message:
          "Please enter field worker Id to proceed. It can't be left blank.",
        isErrorMessage: true,
      });
      return;
    }

    //   const [unAssignedFollowUpsData, setUnAssignedFollowUpsData] = useState([]);
    // const [fieldWorkerIDField, setF

    // assignPendingFollowUp();

    SupervisorAPIHandler.AssignUnAssignedFollowUpAPICall({
      // fieldWorkerID: fieldWorkerIDField,
      unassignedPatientData: unassignedFollowUpData,
      assignUnAssignedFollowUpResponseHanlder:
        assignUnAssignedFollowUpResponseHanlder,
    });

    //props.assignPendingFollowUpHandler({});

    // unassignedFollowUpData

    // props.setAlertFlag("True")

    // const values = [...fieldWorkerId];
    // values[index] = "";
    // setFieldWorkerId(values);
    // props.setAlertMessage(
    //   " Follow up Assigned to field Worker ID: " + fieldWorkerId[index]
    // );
    // props.setAlertFlag(true);
  };

  // const assignPendingFollowUp = (prop) => {
  //   console.log("assignPendingFollowUp");
  //   console.log(unAssignedFollowUpsData);
  //   console.log(fieldWorkerIDField);

  //   SupervisorAPIHandler.AssignUnAssignedFollowUpAPICall({
  //     fieldWorkerID: fieldWorkerIDField,
  //     unassignedPatientData: unAssignedFollowUpsData,
  //     assignUnAssignedFollowUpResponseHanlder:
  //       assignUnAssignedFollowUpResponseHanlder,
  //   });
  // };

  const assignUnAssignedFollowUpResponseHanlder = (assignedFollowUpData) => {
    console.log("assignUnAssignedFollowUpResponseHanlder");
    console.log(assignedFollowUpData);
  };

  // const getUnassignedFollowUpsAPIHandler = (fieldWorkerDetailsData) => {
  //   // setFieldWorkerList(fieldWorkerListData.fieldWorkerListData);
  //   console.log("getAllFieldWorkerListAPIHandler added called response");
  //   console.log(fieldWorkerDetailsData.fieldWorkerListData);
  // };

  // {user !== null && user.userType === "Front Desk" && (
  //   <FrontDeskScreen
  //     user={user}
  //     setUser={setUser}
  //     setAlertFlag={setAlertFlag}
  //     setAlertMessage={setAlertMessage}
  //   />
  // )}

  return (
    <>
      {
        <div className={classes.center}>
          <h1> Assign Follow ups </h1>
          <div className={classes.ul}>
            {unAssignedFollowUpsData.length === 0 && (
              <div>
                <h3 style={{ textAlign: "center" }}>
                  No unassigned follow ups available.
                </h3>
              </div>
            )}

            {unAssignedFollowUpsData.map((unassignedFollowUpData) => (
              <div
                key={unassignedFollowUpData.patientId}
                className={classes.plist}
              >
                <div>Name:{unassignedFollowUpData.name}</div>
                <div>Age:{unassignedFollowUpData.age}</div>
                <div>Sex:{unassignedFollowUpData.sex}</div>
                <div>Contact:{unassignedFollowUpData.contact}</div>

                <SmallInputField
                  type="text"
                  label="Field Worker Id"
                  // value={unassignedFollowUpData.fieldWorkerID}
                  id={unassignedFollowUpData.patientId}
                  onChange={(event) =>
                    FieldWorkerIdChangeHandler(unassignedFollowUpData, event)
                  }
                />
                <AddButton
                  value="Assign Follow ups"
                  onClick={() => AssignFollowUpHandler(unassignedFollowUpData)}
                />
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default NewFollowUpAssign;
