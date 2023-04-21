import React, { useState } from "react";
import classes from "./AddFollowup.module.css";
import DoctorUtilitiesKeys from "../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import DoctorFollowUpDataCell from "./DoctorFollowUpDataCell/DoctorFollowUpDataCell";

function AddFollowup(props) {

  const [followUpsList, setFollowUpsList] = useState([
    DoctorUtilitiesKeys.getDoctorFollowUpInitialData(),
  ]);

  console.log("followUpsList data");
  console.log(followUpsList);

  const handleAddfollowups = () => {
    const initialFollowUpLists = followUpsList;

    setFollowUpsList([
      ...initialFollowUpLists,
      ...[DoctorUtilitiesKeys.getDoctorFollowUpInitialData()],
    ]);
  };

  const handleResetfollowups = () => {
  
  };

 

 
  const handleDoctorRemarksDataChangeHandler = (prop) => {
    const updatedFollowUpListData = followUpsList.map((followUpData, index) => {
      if (prop.followUpIndex === index) {
        return { ...followUpData, ...prop.followUpData };
      } else {
        return followUpData;
      }
    });
    setFollowUpsList(updatedFollowUpListData);
  };

  const removeFollowUpButtonHandler = (indexToRemoved) => {
    const updatedFollowUpList = followUpsList.filter((_, index) => {
      return index !== indexToRemoved;
    });
    setFollowUpsList(updatedFollowUpList);
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
            Add followup
          </button>

          <button
            className={classes.submit_btn}
            type="button"
            onClick={handleFollowupPopUpFormSubmit}
          >
            Save Followups
          </button>
          <button
            className={classes.close_btn}
            type="button"
            onClick={() => props.setAddFollowup(false)}
          >
            Cancel
          </button>
        </div>

        <form id="followupform" onSubmit={handleSubmit}>
          {followUpsList.map((followupData, index) => (
            <div>
              <DoctorFollowUpDataCell
                key={index}
                followUpData={followupData}
                handleDoctorRemarksDataChangeHandler={
                  handleDoctorRemarksDataChangeHandler
                }
                removeFollowUpButtonHandler={removeFollowUpButtonHandler}
                followUpIndex={index}
              />

              {/* <label>
                Temperature
                <input
                  type="checkbox"
                  name={`temperature${index}`}
                  checked={followup.checkboxes[0]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 0, index)
                  }
                />
              </label> */}
              {/* <label>
                Sugar Level
                <input
                  type="checkbox"
                  name={`sugarLevel${index}`}
                  checked={followup.checkboxes[1]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 1, index)
                  }
                />
              </label> */}
              {/* <label>
                Blood Pressure
                <input
                  type="checkbox"
                  name={`bloodPressure${index}`}
                  checked={followup.checkboxes[2]}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, 2, index)
                  }
                />
              </label> */}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default AddFollowup;
