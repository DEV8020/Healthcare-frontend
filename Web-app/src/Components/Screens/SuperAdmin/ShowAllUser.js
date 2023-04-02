import classes from "./ShowAllUser.module.css";

import React, { useState } from "react";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

var UserList = [
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
const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");
  
 
  const changeUserDataHandler = (user_id) => {
    console.log(user_id);
    setUpdateCredentialUserId(user_id);
    setShowUpdateCredentialPopup(true);
  };
  const handleCredentialPopupUpdate = (UpdateCredentials) => {
    const updatedUserList = UserList.map((user) => {
      if (user.d_id === UpdateCredentials.updatedId) {
        return {
          ...user,
          // userType: user.userType,
          userID: UpdateCredentials.updatedUserId,
          Password: UpdateCredentials.updatedUserPassword,
        };
      } else {
        return user;
      }
    });

    // The above code will update the object with d_id "d1" with the new values
    // and return a new array with the updated object.
    // You can then store the updated array back in the same variable:
    UserList = updatedUserList;

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
      <h2> User List</h2>
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
          d_id={UpdateCredentialUserId}
        />
      )}
    </div>
  );
};

export default ShowAllUser;
