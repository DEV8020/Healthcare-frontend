import React, { useState } from "react";
import classes from "./AddFollowup.module.css";

function AddFollowup(props) {
  const today = new Date();
  const minDate = today.toISOString().substr(0, 10);
  const [followUps, setFollowUps] = useState([
    { doctorRemark: "", date: "", checkboxes: [false, false, false] },
  ]);

  const handleAddfollowups = () => {
    setFollowUps([
      ...followUps,
      { doctorRemark: "", date: "", checkboxes: [false, false, false] },
    ]);
  };
  const handleResetfollowups = () => {
    setFollowUps([
      { doctorRemark: "", date: "", checkboxes: [false, false, false] },
    ]);
  };

  const handleRemovefollowups = (index) => {
    const newfollowups = [...followUps];
    newfollowups.splice(index, 1);
    setFollowUps(newfollowups);
  };

  const handledoctorRemarkChange = (value, index) => {
    const newfollowups = [...followUps];
    newfollowups[index].doctorRemark = value;
    setFollowUps(newfollowups);
  };

  const handleDateChange = (value, index) => {
    const newfollowups = [...followUps];
    newfollowups[index].date = value;
    setFollowUps(newfollowups);
  };

  const handleCheckboxChange = (checked, checkboxIndex, followupIndex) => {
    const newfollowups = [...followUps];
    newfollowups[followupIndex].checkboxes[checkboxIndex] = checked;
    setFollowUps(newfollowups);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleFollowupPopUpFormSubmit = () => {
    const formData = new FormData(document.getElementById("followupform"));
    const formValues = {};
    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }

    setFollowUps([
      ...followUps,
      {
        doctorRemark: formValues["doctorRemark"],
        date: formValues["date"],
        checkboxes: [
          formValues["temprature"] === "on",
          formValues["sugarLevel"] === "on",
          formValues["bloodPressure"] === "on",
        ],
      },
    ]);

    console.log(followUps);
    setFollowUps([
      { doctorRemark: "", date: "", checkboxes: [false, false, false] },
    ]);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <div className={classes.button_row}>
          <h2> Add Followups </h2>
          <button
            className={classes.add_btn}
            type="button"
            onClick={handleAddfollowups}
          >
            Add follow-up
          </button>
          <button
            className={classes.reset_btn}
            type="button"
            onClick={handleResetfollowups}
          >
            reset
          </button>

          <button
            className={classes.submit_btn}
            type="button"
            onClick={handleFollowupPopUpFormSubmit}
          >
            Submit
          </button>
          <button
            className={classes.close_btn}
            type="button"
            onClick={() => props.setAddFollowup(false)}
          >
            cancel
          </button>
        </div>
        <form id="followupform" onSubmit={handleSubmit}>
          {followUps.map((followup, index) => (
            <div key={followup.date}>
              <input
                type="text"
                name={`doctorRemark${index}`}
                value={followup.doctorRemark}
                onChange={(event) =>
                  handledoctorRemarkChange(event.target.value, index)
                }
              />
              <input
                type="date"
                min={minDate}
                name={`date${index}`}
                value={followup.date}
                onChange={(event) =>
                  handleDateChange(event.target.value, index)
                }
              />
              <label>
                Temperature
                <input
                  type="checkbox"
                  name={`temperature${index}`}
                  checked={followup.checkboxes[0]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 0, index)
                  }
                />
              </label>
              <label>
                Sugar Level
                <input
                  type="checkbox"
                  name={`sugarLevel${index}`}
                  checked={followup.checkboxes[1]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 1, index)
                  }
                />
              </label>
              <label>
                Blood Pressure
                <input
                  type="checkbox"
                  name={`bloodPressure${index}`}
                  checked={followup.checkboxes[2]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 2, index)
                  }
                />
              </label>
              <button
                className={classes.remove_btn}
                type="button"
                onClick={() => handleRemovefollowups(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default AddFollowup;