import React, { useState } from "react";
import classes from "./AddFollowup.module.css";

function AddFollowup(props) {
  const [numInputs, setNumInputs] = useState(0);

  const handleNumInputsChange = (event) => {
    setNumInputs(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {};
    for (let i = 0; i < numInputs; i++) {
      formValues[i] = {
        doctor_remark: event.target[`doctor_remark-${i}`].value,
        date: event.target[`date-${i}`].value,
      };
    }
    props.setFollowupsData(formValues);
    setNumInputs("");
  };

  const RenderFormInputs = () => {
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <div key={i} className={classes.ul}>
          <label htmlFor={`doctor_remark-${i}`}>followup {i + 1}:</label>
          <input type="text" name={`doctor_remark-${i}`} />
          <label htmlFor={`date-${i}`}>Date {i + 1}:</label>
          <input type="date" name={`date-${i}`} />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <h2> Update User Data </h2>
        <div className={classes.note}>
          Maximum 10 follwup you can assign for more followups first submit then
          add new folloups
        </div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="numInputs">Number of followups:</label>
          <input
            type="number"
            name="numInputs"
            value={numInputs}
            onChange={handleNumInputsChange}
          />
          <input type="submit" />
          <button className={classes.close_btn} onClick={() => setNumInputs(0)}>
            reset
          </button>
          <button
            className={classes.close_btn}
            onClick={() => props.setAddFollowup(false)}
          >
            back
          </button>
          {numInputs > 0 && numInputs < 11 && <RenderFormInputs />}
        </form>
      </div>
    </div>
  );
}

export default AddFollowup;
