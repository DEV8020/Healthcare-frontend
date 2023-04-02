import classes from "./ShowAllUser.module.css";

import React, { useState } from "react";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");

  const UserList = [
    {
      d_id: "d1",
      userType: "Doctor",
      userID: "1",
      Password: "2",
    },
    {
      d_id: "d2",
      userType: "Admin",
      userID: "1",
      Password: "2",
    },
    {
      d_id: "d3",
      userType: "Supervisor",
      userID: "1",
      Password: "2",
    },
    {
      d_id: "d4",
      userType: "Front Desk",
      userID: "1",
      Password: "2",
    },
  ];
  const changeUserDataHandler = (user_id) => {
    console.log(user_id);
    setUpdateCredentialUserId(user_id);
    setShowUpdateCredentialPopup(true);
  };
  const handleCredentialPopupUpdate = (UpdateCredentials) => {
    props.setAlertFlag(true);

    props.setAlertMessage(
      UpdateCredentialUserId + " Credentials Updated successfully"
    );
    setShowUpdateCredentialPopup(false);
    props.setAlertFlag(true);

    props.setAlertMessage(
      " Updated Credentials are : " +
        UpdateCredentials.updatedUserId +
        "  , " +
        UpdateCredentials.updatedUserPassword
    );
  };

  const handleCredentialPopupClose = () => {
    setShowUpdateCredentialPopup(false);
  };

  return (
    <div className={classes.center}>
      <h2> Patient History</h2>
      <div className={classes.ul}>
        {UserList.map((userlist) => (
          <div key={userlist.d_id} className={classes.plist}>
            <div>User Type : {userlist.userType}</div>
            <div>User Name: {userlist.userID}</div>
            <div>Password : {userlist.Password}</div>
            <AddButton
              value="Update"
              onClick={() => changeUserDataHandler(userlist.d_id)}
            />
          </div>
        ))}
      </div>
      {showUpdateCredentialPopup && (
        <UpdateCredentialPopup
          onUpdate={handleCredentialPopupUpdate}
          onClose={handleCredentialPopupClose}
        />
      )}
    </div>
  );
};

export default ShowAllUser;
