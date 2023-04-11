import classes from "./ShowHospitalUsers.module.css";
import AddButton from "../UI Elements/MenuForm Elements/addButton";
import UpdateCredentialPopup from "../UI Elements/Pop-ups/UpdateCredentialPopup";

import React, { useEffect, useState } from "react";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
// var HospitalUserList = [
//   {
//     d_id: "d1",
//     userType: "Doctor",
//     userID: "1",
//     Password: "2",
//   },
//   {
//     d_id: "d2",
//     userType: "Doctor",
//     userID: "1",
//     Password: "2",
//   },
//   {
//     d_id: "d3",
//     userType: "Front Desk",
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

const ShowHospitalUsers = (props) => {
  const [showUpdateCredentialPopup, setShowUpdateCredentialPopup] =
    useState(false);
  const [UpdateCredentialUserId, setUpdateCredentialUserId] = useState("");
  const [hospitalUserList, setHospitalUserList] = useState([]);
  // const [hospitalUserList, setHospitalUserList] = useState({});
  const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});

  const changeHospitalUserDataHandler = (hospitalUserData) => {
    console.log("changeHospitalUserDataHandler called");
    console.log(hospitalUserData);
    setUserDataToBeUpdated(hospitalUserData);
    // console.log(user_id);
    // setUpdateCredentialUserId(user_id);
    setShowUpdateCredentialPopup(true);
  };

  // UtilitiesMethods

  const displayMessagesInParentViewHandler = (prop) => {
    UtilitiesMethods.showMessageBarAtTheBottom({
      message: prop.message,
      isErrorMessage: prop.isErrorMessage,
      alertMessageElement: props.setAlertMessage,
      alertMessageFlag: props.setAlertFlag,
    });
  };

  useEffect(() => {
    setHospitalUserList(props.registeredUserList);
  }, [props.registeredUserList]);

  const handleCredentialPopupUpdate = (UpdateCredentials) => {
    setShowUpdateCredentialPopup(false);
    const updatedUserList = hospitalUserList.map((user) => {
      if (user.d_id === UpdateCredentials.updatedId) {
        return {
          ...user,
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
    // hos = updatedUserList;
    props.setAlertFlag(true);

    props.setAlertMessage(
      " Updated Credentials are : " +
        UpdateCredentials.updatedUserId +
        "  , " +
        UpdateCredentials.updatedUserPassword
    );
  };

  const updateUserSuccessHandler = (adminSubUserResponseData) => {
    console.log("updateUserSuccessHandler");
    console.log(adminSubUserResponseData);
    displayMessagesInParentViewHandler({
      message: "Doctor details updated successfully.",
      isErrorMessage: false,
    });
    setShowUpdateCredentialPopup(false);
    props.refreshUsersListResponseHandler();
  };

  const handleCredentialPopupClose = () => {
    setShowUpdateCredentialPopup(false);
  };

  //  hospitalUserList.map((hospitalUserData) => {console.log(hospitalUserData);});

  // var htmlElementToRender =  <> <div className={classes.center}>
  // <h2> All Hospital Users</h2>
  // <div className={classes.ul}>
  //   {hospitalUserList.map((hospitalUserData) => (

  //     <div key={hospitalUserData.userID} className={classes.plist}>
  //       <div>User Type : {hospitalUserData.userType}</div>
  //       <div>User Name: {hospitalUserData.name}</div>
  //       <div>Password : {hospitalUserData.password}</div>
  //       <AddButton
  //         value="Update"
  //         onClick={() => changeHospitalUserDataHandler(hospitalUserData)}
  //       />
  //     </div>
  //   ))}
  // </div>
  // </>;

  return (
    <div className={classes.center}>
      <h2> All Hospital Users</h2>


      {hospitalUserList === null ||  hospitalUserList.length === 0 && (
        <div>
          {" "}
          <h3 style={{textAlign:"center"}}>No users to display. Please add some to proceed.</h3>
        </div>
      )}

      {/* {props.registeredUserList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            No registered users to display. Please add some to proceed.
          </h3>
        </div>
      )} */}

      <div className={classes.ul}>
        {hospitalUserList.map((hospitalUserData) => (
          <div key={hospitalUserData.userID} className={classes.plist}>
            <div>User Type : {hospitalUserData.userType}</div>
            <div>User Name: {hospitalUserData.name}</div>
            <div>Password : {hospitalUserData.password}</div>
            <AddButton
              value="Update"
              onClick={() => changeHospitalUserDataHandler(hospitalUserData)}
            />
          </div>
        ))}
      </div>
      {showUpdateCredentialPopup && (
        <UpdateCredentialPopup
          onUpdate={handleCredentialPopupUpdate}
          onClose={handleCredentialPopupClose}
          userDataToBeUpdated={userDataToBeUpdated}
          displayMessagesInParentViewHandler={
            displayMessagesInParentViewHandler
          }
          updateUserSuccessHandler={updateUserSuccessHandler}
        />
      )}
    </div>
  );
};

export default ShowHospitalUsers;
