import React, { useEffect, useState } from "react";
import classes from "./NewFollowUpAssign.module.css";
import SupervisorAPIHandler from "../../../Controllers/SupervisorAPIHandler";
import UnAssignedFollowUpCell from "../../../ReusableComponents/SupervisorModule/UnassignedFollowUpCell/UnAssignedFollowUpCell";


const NewFollowUpAssign = (props) => {
  const [unAssignedFollowUpsData, setUnAssignedFollowUpsData] = useState([]);
  const [
    isUnAssignedFollowUpListToRefresh,
    setIsUnAssignedFollowUpListToRefresh,
  ] = useState(true);

  //########################  Unassigned Patient Follow Ups  ########################

  //API Call...
  useEffect(() => {
    SupervisorAPIHandler.GetUnassignedPatientListAPICall({
      getUnassignedFollowUpsAPIHandler: getUnassignedFollowUpsAPIHandler,
    });
  }, [isUnAssignedFollowUpListToRefresh]);

  //Corresponding API Call Handler...
  const getUnassignedFollowUpsAPIHandler = (unAssignedFollowUpsData) => {
    setUnAssignedFollowUpsData(unAssignedFollowUpsData.UnAssignedFollowUpData);
    const modifiedData = unAssignedFollowUpsData.UnAssignedFollowUpData.map(
      (patientData) => {
        return { ...patientData, ...{ fieldWorkerID: "" } };
      }
    );
    setUnAssignedFollowUpsData(modifiedData);
  };

  //########################  Unassigned Patient Follow Ups Ends Here  ########################

  const AssignFollowUpHandler = (unassignedFollowUpData) => {
    console.log("AssignFollowUpHandler");
    console.log(unassignedFollowUpData);

    SupervisorAPIHandler.AssignUnAssignedFollowUpAPICall({
      unassignedPatientData: unassignedFollowUpData,
      assignUnAssignedFollowUpResponseHanlder:
        assignUnAssignedFollowUpResponseHanlder,
    });
  };

  const assignUnAssignedFollowUpResponseHanlder = (assignedFollowUpData) => {
    if (assignedFollowUpData.isFollowUpAssigned === true) {
      props.showMessageAtBottomBar({
        message: "Follow Ups Assigned to Field Worker.",
        isErrorMessage: false,
      });
      setUnAssignedFollowUpsData([]);
      setIsUnAssignedFollowUpListToRefresh((isRefresh) => {
        return !isRefresh;
      });
      return;
    }

    props.showMessageAtBottomBar({
      message: assignedFollowUpData.errorMessage,
      isErrorMessage: true,
    });
  };

  

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
              <>
                <UnAssignedFollowUpCell
                  unassignedFollowUpData={unassignedFollowUpData}
                  showMessageAtBottomBar={props.showMessageAtBottomBar}
                  AssignFollowUpHandler={AssignFollowUpHandler}
                ></UnAssignedFollowUpCell>
              </>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default NewFollowUpAssign;