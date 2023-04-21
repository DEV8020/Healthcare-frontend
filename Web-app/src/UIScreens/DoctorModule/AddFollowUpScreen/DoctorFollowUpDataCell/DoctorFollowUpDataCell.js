import { useState } from "react";
import DoctorUtilitiesKeys from "../../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import classes from "../AddFollowup.module.css";

const DoctorFollowUpDataCell = (props) => {
  const [followUpData, setFollowUpData] = useState(props.followUpData);
  const [followUpIndex, setFollowUpIndex] = useState(props.followUpIndex);

  const remarksKey =
    DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().doctorRemarksKey;

  const doctorRemarksDataChangeHandler = (event) => {

    const updatedRemarkData = {
      [DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().doctorRemarksKey]:
      event.target.value
    };

    props.handleDoctorRemarksDataChangeHandler({
      followUpIndex: followUpIndex,
      remarkData: updatedRemarkData,
    });
  };

  const removeFollowUpButtonHandler = () => {
    props.removeFollowUpButtonHandler(props.followUpIndex);
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        name="doctorRemark"
        value={props.followUpData[remarksKey]}
        onChange={doctorRemarksDataChangeHandler}
      />
      <input
        type="date"
        // min={minDate}
        name="date"
        value={
          followUpData[
            DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().followUpDateKey
          ]
        }
        // onChange={(event) => handleDateChange(event.target.value, index)}
      />
      <button
        className={classes.remove_btn}
        type="button"
        onClick={removeFollowUpButtonHandler}
        // onClick={() => handleRemovefollowups(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default DoctorFollowUpDataCell;
