import React, { useState } from "react";

// import NewEncounterService from "../../../Services/NewEncounterService";
import classes from "./NewFollowUpAssign.module.css";
import SmallInputField from "../UI Elements/MenuForm Elements/SmallInputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import MenuSubmitButton from "../UI Elements/MenuSubmitButton/MenuSubmitButton";

const NewFollowUpAssign = (props) => {
  const [fieldWorkerId, setFieldWorkerId] = useState([""]);
  

  const FieldWorkerIdChangeHandler = (index,event) => {
    const values = [...fieldWorkerId];
    values[index] = event.target.value;
    setFieldWorkerId(values);
  };
  const AssignFollowUpHandler = (index) => {
    // props.setAlertFlag("True")
    
    const values = [...fieldWorkerId];
    values[index] = "";
    setFieldWorkerId(values);
    props.setAlertMessage(" Follow up Assigned to field Worker ID: " + fieldWorkerId[index]);
    props.setAlertFlag(true);
    
  };

  const patientList = [
    {
      p_id: "p1",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
      
    },
    {
      p_id: "p2",
      name: "johny",
      age: 12,
      sex: "m",
      contact: 1234567890,
      
    },
  ];
  return (
    <div className={classes.center}>
      <h1> Assign Follow ups </h1>
      <div className={classes.ul}>
        {patientList.map((patientdata) => (
          <div key={patientdata.p_id} className={classes.plist}>
            <div>Name:{patientdata.name}</div>
            <div>Age:{patientdata.age}</div>
            <div>Sex:{patientdata.sex}</div>
            <div>Contact:{patientdata.contact}</div>
            
            <SmallInputField
                type="text"
                label="Field Worker Id"
                value={fieldWorkerId[patientdata.p_id]}
                id={patientdata.p_id}
                onChange={event=>FieldWorkerIdChangeHandler(patientdata.p_id,event)}
              /> 
              <AddButton value="Assign Follow ups" onClick={()=>AssignFollowUpHandler(patientdata.p_id)} />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewFollowUpAssign;
