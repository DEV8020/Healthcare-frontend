import React, { useState } from "react";
import classes from "./AddFollowup.module.css";
import DoctorUtilitiesKeys from "../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import DoctorFollowUpDataCell from "./DoctorFollowUpDataCell/DoctorFollowUpDataCell";
import DoctorReadingsCell from "./DoctorFollowUpDataCell/DoctorReadingsCell";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

function AddFollowup(props) {
  // const [followUpsList, setFollowUpsList] = useState([
  //   DoctorUtilitiesKeys.getDoctorFollowUpInitialData(),
  // ]);

  const followUpsList = props.doctorFollowUpData;

  // doctorFollowUpData={doctorFollowUpData}
          // setDoctorFollowUpData={setDoctorFollowUpData}

  const handleAddfollowups = () => {
    const initialFollowUpLists = followUpsList;
    props.setDoctorFollowUpData([
      ...initialFollowUpLists,
      ...[DoctorUtilitiesKeys.getDoctorFollowUpInitialData()],
    ]);
  };

  const handleDoctorReadingsDataChangeHandler = (prop) => {
    const updatedFollowUpListData = followUpsList.map((followUpData, index) => {
      if (prop.index === index) {
        return { ...followUpData, ...{ readings: prop.updatedData } };
      } else {
        return followUpData;
      }
    });
    props.setDoctorFollowUpData(updatedFollowUpListData);
  };

  const handleDoctorRemarksDataChangeHandler = (prop) => {
    const updatedFollowUpListData = followUpsList.map((followUpData, index) => {
      if (prop.followUpIndex === index) {
        return { ...followUpData, ...prop.followUpData };
      } else {
        return followUpData;
      }
    });
    props.setDoctorFollowUpData(updatedFollowUpListData);
  };

  const removeFollowUpButtonHandler = (indexToRemoved) => {
    const updatedFollowUpList = followUpsList.filter((_, index) => {
      return index !== indexToRemoved;
    });
    props.setDoctorFollowUpData(updatedFollowUpList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const remarksKey =
    DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().doctorRemarksKey;
  const followUpDateKey =
    DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().followUpDateKey;

  const isRemarkDateAddedError = () => {
    var isRemarkDateNotAddded = false;
    followUpsList.map((followUpData) => {
      if (
        UtilitiesMethods.getSpaceTrimmedLenght(followUpData[followUpDateKey]) === 0
      ) {
        isRemarkDateNotAddded = true;
      }
    });
    return isRemarkDateNotAddded;
  };


  const isRemarkAddedError = () => {
    var isRemarkNotAddded = false;
    followUpsList.map((followUpData) => {
      if (
        UtilitiesMethods.getSpaceTrimmedLenght(followUpData[remarksKey]) === 0
      ) {
        isRemarkNotAddded = true;
      }
    });
    return isRemarkNotAddded;
  };

  const showMessageBarAtTheBottom = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });
  };

  const handleFollowupPopUpFormSubmit = () => {
    if (isRemarkAddedError()) {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please add all the remarks. It can't be left blank.",
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
          false
      });
      return;
    }

    if (isRemarkDateAddedError()) {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please add all the followup dates. It can't be left blank.",
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
          false
      });
      return;
    }
    props.setAddFollowup(false);
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
          {/* <button
            className={classes.close_btn}
            type="button"
            onClick={() => props.setAddFollowup(false)}
          >
            Cancel
          </button> */}
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

              <DoctorReadingsCell
                readingsData={followupData.readings}
                followUpIndex={index}
                handleDoctorReadingsDataChangeHandler={
                  handleDoctorReadingsDataChangeHandler
                }
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default AddFollowup;
