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
  const UpdatedUserNameChangeHandler = (event) => {
    // setUpdatedUserPassword(event.target.value);
    updateUserData({ name: event.target.value });
  };
  const UpdatedUserContactChangeHandler = (event) => {
    // setUpdatedUserPassword(event.target.value);
    updateUserData({ contact: event.target.value });
  };
  const UpdatedUserAddressChangeHandler = (event) => {
    // setUpdatedUserPassword(event.target.value);
    updateUserData({ address: event.target.value });
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
        <h2> Update User Data </h2>
        <form onSubmit={UpdateCredentialSubmitHandler}>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userDataToBeUpdated.userId}
            onChange={UpdatedUserIdChangeHandler}
          />

          {/*if userDatatoBeUpdated has userName field than this will be shown  */}
          {userDataToBeUpdated.userName && (
            <>
              <label htmlFor="userName">Name:</label>
              <input
                type="text"
                id="userName"
                value={userDataToBeUpdated.userName}
                onChange={UpdatedUserNameChangeHandler}
              />
            </>
          )}

          {userDataToBeUpdated.userContact  && (
            <>
              <label htmlFor="userContact">Contact:</label>
              <input
                type="text"
                id="userContact"
                value={userDataToBeUpdated.userContact}
                onChange={UpdatedUserContactChangeHandler}
              />
            </>
          )}

          {userDataToBeUpdated.userAddress && userDataToBeUpdated.userType !== "Supervisor" && (
            <>
              <label htmlFor="userAddress">Address:</label>
              <input
                type="text"
                id="userAddress"
                value={userDataToBeUpdated.userAddress}
                onChange={UpdatedUserAddressChangeHandler}
              />
            </>
          )}

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
