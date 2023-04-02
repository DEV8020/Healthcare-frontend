import classes from "./ShowHospitalUsers.module.css";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";

import React, { useState } from "react";

const ShowHospitalUsers = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");
  const HospitalUserList = [
    {
      d_id: "d1",
      userType: "Doctor",
      userID: "1",
      Password: "2",
    },
    {
      d_id: "d2",
      userType: "Doctor",
      userID: "1",
      Password: "2",
    },
    {
      d_id: "d3",
      userType: "Front Desk",
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
  const changeHospitalUserDataHandler = (user_id) => {
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
      <h2> All Hospital Users</h2>
      <div className={classes.ul}>
        {HospitalUserList.map((userlist) => (
          <div key={userlist.d_id} className={classes.plist}>
            <div>User Type : {userlist.userType}</div>
            <div>User Name: {userlist.userID}</div>
            <div>Password : {userlist.Password}</div>
            <AddButton
              value="Update"
              onClick={() => changeHospitalUserDataHandler(userlist.d_id)}
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

export default ShowHospitalUsers;
