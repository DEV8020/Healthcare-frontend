import classes from "./ShowHospitalUsers.module.css";
import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import UpdateCredentialPopup from "../../GenericModule/UpdateUserDataScreen/UpdateCredentialPopup";
import React, { useEffect, useState } from "react";
// import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";
import SuperAdminUtilitiesKeys from "../../SuperAdminModule/SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
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
    props.showMessageAtBottomBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageType],
    });

    // UtilitiesMethods.showMessageBarAtTheBottom({
    //   message: prop.message,
    //   isErrorMessage: prop.isErrorMessage,
    //   alertMessageElement: props.setAlertMessage,
    //   alertMessageFlag: props.setAlertFlag,
    // });
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
      message: "Users details updated successfully.",
      isErrorMessage: false,
    });
    setShowUpdateCredentialPopup(false);
    props.refreshUsersListResponseHandler();
  };

  // UtilitiesKeys
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
    <div className={classes.center_AD}>
      <h2> All Hospital Users</h2>

      {hospitalUserList === null ||
        (hospitalUserList.length === 0 && (
          <div>
            {" "}
            <h3 style={{ textAlign: "center" }}>No users to display.</h3>
          </div>
        ))}

      {/* {props.registeredUserList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            No registered users to display. Please add some to proceed.
          </h3>
        </div>
      )} */}

      <div className={classes.ul_AD}>
        {hospitalUserList.map((hospitalUserData) => (
          <div
            key={
              hospitalUserData[AdminUtilities.getCreateUserDataKeys().userIDKey]
            }
            className={classes.plist_AD}
          >
            <div>
              {AdminUtilities.getCreateFrontDeskLabelKeys().frontDeskUserIDKey}{" "}
              :{" "}
              {
                hospitalUserData[
                  AdminUtilities.getCreateUserDataKeys().userIDKey
                ]
              }
            </div>

            <div>
              {
                AdminUtilities.getCreateFrontDeskLabelKeys()
                  .frontDeskUserNameKey
              }{" "}
              :{" "}
              {
                hospitalUserData[
                  AdminUtilities.getCreateUserDataKeys().userNameKey
                ]
              }
            </div>

            <div>
              {
                AdminUtilities.getCreateFrontDeskLabelKeys()
                  .frontDeskUserTypeKey
              }{" "}
              :{" "}
              {SuperAdminUtilitiesKeys.getUserType(
                hospitalUserData[
                  AdminUtilities.getCreateUserDataKeys().userTypeKey
                ]
              )}
            </div>

            {/* <div>
              Password :{" "}
              {
                hospitalUserData[
                  AdminUtilities.getCreateUserDataKeys().userPasswordKey
                ]
              }
            </div> */}
            {/* <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,

                width: 400,
              }}
              key={
                hospitalUserData[
                  AdminUtilities.getCreateUserDataKeys().userIDKey
                ]
              }
            > */}
            <AddButton
              value="Update"
              onClick={() => changeHospitalUserDataHandler(hospitalUserData)}
            />
            {/* </div> */}
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
