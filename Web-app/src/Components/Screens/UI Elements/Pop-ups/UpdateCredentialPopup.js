import React, { useEffect, useState, useSyncExternalStore } from "react";
import classes from "./popup.module.css";

const UpdateCredentialPopup = (props) => {
  const [updatedUserId, setUpdatedUserId] = useState("");
  const [updatedUserPassword, setUpdatedUserPassword] = useState("");
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});
  const [dataNeedToUpdate, setDataNeedToUpdate] = useState(false);

  useEffect(() => {
    // if(){

    // }
    setUserDataToBeUpdated(props.userDataToBeUpdated);
    //dataNeedToUpdate= true;
    // console.log("setUserDataToBeUpdated use effect called");
  }, []);

  console.log("userDataToBeUpdated UpdateCredentialPopup pop up");
  console.log(userDataToBeUpdated);

  const UpdatedUserIdChangeHandler = (event) => {
    // setUpdatedUserId(event.target.value);
    updateUserData({ userId: event.target.value });
  };
  const UpdatedUserPasswordChangeHandler = (event) => {
    // setUpdatedUserPassword(event.target.value);
    updateUserData({ password: event.target.value });
  };

  const updateUserData = (userDataToUpdated) => {
    console.log("updateUserData");
    console.log(userDataToUpdated);

    setUserDataToBeUpdated((userData) => {
      console.log("setUserDataToBeUpdated");
      console.log({ ...userData, ...userDataToUpdated });
      return { ...userData, ...userDataToUpdated };
    });

    //props.updateDataToUpdateHandler({ ...userDataToBeUpdated, ...userDataToUpdated });

    // setUserDataToBeUpdated((userData) => {
    //   console.log("updateUserData setUpdatedUserId");
    //   console.log({ ...userData, ...userDataToBeUpdated });
    //   return { ...userData, ...userDataToUpdated };
    // });
  };

  const UpdateCredentialSubmitHandler = (event) => {
    event.preventDefault();
    const updatedCredentials = {
      updatedId: props.d_id,
      updatedUserId: updatedUserId,
      updatedUserPassword: updatedUserPassword,
    };
    props.onUpdate(updatedCredentials);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <h2> Update Credentials </h2>
        <form onSubmit={UpdateCredentialSubmitHandler}>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userDataToBeUpdated.userId}
            onChange={UpdatedUserIdChangeHandler}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={userDataToBeUpdated.password}
            onChange={UpdatedUserPasswordChangeHandler}
          />

          <input type="submit" value="Update" />
          <button className={classes.close_btn} onClick={props.onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialPopup;
