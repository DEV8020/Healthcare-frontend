import classes from "./ShowAllUser.module.css";

import React, { useEffect, useState } from "react";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";

// var UserList = [
//   {
//     d_id: "d1",
//     userType: "Doctor",
//     userID: "1",
//     Password: "2",
//   },
//   {
//     d_id: "d2",
//     userType: "Admin",
//     userID: "1",
//     Password: "2",
//   },
//   {
//     d_id: "d3",
//     userType: "Supervisor",
//     userID: "1",
//     Password: "2",
//   },
//   {
//     d_id: "d4",
//     userType: "Front Desk",
//     userID: "1",
//     Password: "2",
//   },
// ];
const ShowAllUser = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");

  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  useEffect(() => {
    setAllRegisteredUsersList(props.registeredUsersList);
  }, [props.registeredUsersList]);

  // SuperAdminAPIHandler

  // useEffect(() => {
  //   //if(allRegisteredUsersList.count === 0){
  //   SuperAdminAPIHandler.GetSuperAdminAllRegisteredUserList({
  //     showAllRegisteredUserResponseHandler:
  //       showAllRegisteredUserResponseHandler,
  //   });
  // // }
  // }, [props.registeredUsersList]);

  // const showAllRegisteredUserResponseHandler = (
  //   allRegisteredUsersResponseData
  // ) => {
  //   console.log(
  //     "showAllRegisteredUserResponseHandler allRegisteredUsersResponseData"
  //   );
  //   console.log(allRegisteredUsersResponseData);
  //   if (allRegisteredUsersResponseData.isRegisteredUsersListRecieved === true) {
  //     props.allRegisteredListHandleCallBack(
  //       allRegisteredUsersResponseData.registeredUserListData
  //     );
  //     // props.hospitalListsWithNoAdminsCallBackHandler(
  //     //   hospitalListResponseData.hospitalListData
  //     // );
  //   }
  // };

  // isRegisteredUsersListRecieved: true,
  // registeredUserListData: allRegisteredUserListServiceData.responseData.data,
  // errorMessage: null,

  const changeUserDataHandler = (userDataToBeUpdated) => {
    console.log(userDataToBeUpdated);
    //setUpdateCredentialUserId(user_id);
    console.log("changeUserDataHandler called");
    setUserDataToBeUpdated(userDataToBeUpdated);
    setShowUpdateCredentialPopup(true);

    //registeredUserUpdateHandleCallBack
  };

  const handleCredentialPopupUpdate = (UpdateCredentials) => {
    const updatedUserList = allRegisteredUsersList.map((user) => {
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
    allRegisteredUsersList = updatedUserList;

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

  const updateDataToUpdateHandler = (updatedData) => {
    console.log("updateDataToUpdateHandler called");
    console.log(updatedData);
    // setUserDataToBeUpdated(updatedData);
    props.registeredUserUpdateHandleCallBack(updatedData);
  };

  // authId: 2
  // hospital: {hospId: 1, name: 'Hospital5', address: '400001', supId: {…}}
  // name: "Admin1"
  // password: "admin1"
  // userId: "admin1"
  // userType: "Admin"

  return (
    <div className={classes.center}>
      <h2> User List</h2>
      <div className={classes.ul}>
        {allRegisteredUsersList.map((userData) => (
          <div key={userData.authId} className={classes.plist}>
            <div>User Type : {userData.userType}</div>
            <div>User Name: {userData.name}</div>
            <div>Password : {userData.password}</div>
            <AddButton
              value="Update"
              onClick={() => changeUserDataHandler(userData)}
            />
          </div>
        ))}
      </div>
      {showUpdateCredentialPopup && (
        <UpdateCredentialPopup
          onUpdate={handleCredentialPopupUpdate}
          onClose={handleCredentialPopupClose}
          d_id={UpdateCredentialUserId}
          userDataToBeUpdated={userDataToBeUpdated}
          updateDataToUpdateHandler={updateDataToUpdateHandler}
        />
      )}
    </div>
  );
};

export default ShowAllUser;
