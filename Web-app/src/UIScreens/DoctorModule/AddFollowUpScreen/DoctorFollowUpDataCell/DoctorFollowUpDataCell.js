import { useState } from "react";
import DoctorUtilitiesKeys from "../../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import classes from "../AddFollowup.module.css";

const DoctorFollowUpDataCell = (props) => {
  const [followUpData, setFollowUpData] = useState(props.followUpData);
  const [followUpIndex, setFollowUpIndex] = useState(props.followUpIndex);

  const today = new Date();
  const minDate = today.toISOString().substring(0, 10);

  console.log(minDate);
  console.log(props);

  const remarksKey =
    DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().doctorRemarksKey;
    const followUpDateKey =
    DoctorUtilitiesKeys.getDoctorAddFollowUpLabelKeys().followUpDateKey;

  const doctorRemarksDataChangeHandler = (event) => {

    const updatedRemarkData = {
      [remarksKey]:
      event.target.value
    };

    props.handleDoctorRemarksDataChangeHandler({
      followUpIndex: followUpIndex,
      followUpData: updatedRemarkData,
    });
  };

  const doctorFollowUpDateChangeHandler = (event) => {

    const updatedDateData = {
      [followUpDateKey]:
      event.target.value
    };

    props.handleDoctorRemarksDataChangeHandler({
      followUpIndex: followUpIndex,
      followUpData: updatedDateData,
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
        min= {minDate}
        name="date"
        value={props.followUpData[followUpDateKey]}
        onChange={doctorFollowUpDateChangeHandler}
      />
      <button
        className={classes.remove_btn}
        type="button"
        onClick={removeFollowUpButtonHandler}
      >
        Remove
      </button>
    </div>
  );
};

export default DoctorFollowUpDataCell;
