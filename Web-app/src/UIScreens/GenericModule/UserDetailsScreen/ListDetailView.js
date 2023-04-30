// import React, { useEffect, useState } from "react";
// // import classes from "./popup.module.css";
// import classes from "./popup.module.css";
// import SuperAdminUserRelatedAPIHandler from "../../../Controllers/SuperAdminUserRelatedAPIHandler";
// // import SuperAdminUserRelatedAPIHandler from "../../../../Controllers/SuperAdminUserRelatedAPIHandler";
// // import MessageComponent from "../../MessageComponent/MessageComponent";
// // import UtilitiesMethods from "../../../../Utilities/UtilitiesMethods";
// import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
// // import AdminAPIHandler from "../../../../Controllers/AdminAPIHandler";
// import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
// import SuperAdminUtilitiesKeys from "../../SuperAdminModule/SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
// import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const ListDetailView = (props) => {
  return (
    <>
      <label>Hello</label><br/>
      <label>Hello</label><br/>
      <label>Hello</label><br/>
      <label>Hello</label><br/>
      <label>Hello</label><br/>
    </>
  );

  // const [updatedUserId, setUpdatedUserId] = useState("");
  // const [updatedUserPassword, setUpdatedUserPassword] = useState("");

  //   const [userDataToBeUpdated, setUserDataToBeUpdated] = useState({});
  //   // const [dataNeedToUpdate, setDataNeedToUpdate] = useState(false);

  //   useEffect(() => {
  //     // setUserDataToBeUpdated(props.userDataToBeUpdated);
  //     setUserDataToBeUpdated({
  //       ...props.userDataToBeUpdated,
  //       ...{
  //         [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]: "",
  //       },
  //     });

  //     console.log("userDataToBeUpdated");
  //     console.log(userDataToBeUpdated);
  //   }, []);

  //   console.log("userDataToBeUpdated UpdateCredentialPopup pop up");
  //   console.log(userDataToBeUpdated);

  //   const selectedUserType = SuperAdminUtilitiesKeys.getUserType(
  //     props.userDataToBeUpdated[
  //       SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey
  //     ]
  //   );

  //   console.log(
  //     "userDataToBeUpdated UpdateCredentialPopup pop up user type is :"
  //   );
  //   console.log(selectedUserType);

  //   //########################## Data Handler Methods  ##########################
  //   //User ID Change Handler...
  //   const UpdatedUserIdChangeHandler = (event) => {
  //     updateUserData({
  //       [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey]:
  //         event.target.value,
  //     });
  //   };

  //   //User Password Change Handler...
  //   const UpdatedUserPasswordChangeHandler = (event) => {
  //     console.log("UpdatedUserPasswordChangeHandler called");
  //     updateUserData({
  //       [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]:
  //         event.target.value,
  //     });
  //   };

  //   //User Name Change Handler...
  //   const UpdatedUserNameChangeHandler = (event) => {
  //     updateUserData({
  //       [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey]:
  //         event.target.value,
  //     });
  //   };

  //   //User Contact Change Handler...
  //   const UpdatedUserContactChangeHandler = (event) => {
  //     updateUserData({
  //       [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey]:
  //         event.target.value,
  //     });
  //   };

  //   //User Address Change Handler...
  //   const UpdatedUserAddressChangeHandler = (event) => {
  //     updateUserData({
  //       [SuperAdminUtilitiesKeys.getCreateUserDataKeys().userAddressKey]:
  //         event.target.value,
  //     });
  //   };

  //   //User License ID (Specially Doctor) Handler...
  //   const UpdatedUserLicenseIdChangeHandler = (event) => {
  //     updateUserData({ licId: event.target.value });
  //   };

  //   //User Specialisation (Specially Doctor) Handler...
  //   const UpdatedUserSpecialisationChangeHandler = (event) => {
  //     updateUserData({ docSpecialization: event.target.value });
  //   };
  //   //########################## Data Handler Methods Ends Here  ##########################

  //   const updateUserData = (userDataToUpdated) => {
  //     // console.log("updateUserData");
  //     // console.log(userDataToUpdated);

  //     setUserDataToBeUpdated((userData) => {
  //       // console.log("setUserDataToBeUpdated");
  //       // console.log({ ...userData, ...userDataToUpdated });
  //       return { ...userData, ...userDataToUpdated };
  //     });
  //   };

  //   const UpdateCredentialSubmitHandler = (event) => {
  //     event.preventDefault();

  //     if (
  //       UtilitiesMethods.getSpaceTrimmedLenght(
  //         userDataToBeUpdated[
  //           SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
  //         ]
  //       ) === 0
  //     ) {
  //       props.displayMessagesInParentViewHandler({
  //         message: "Please enter user Id to proceed, It can't be left blank.",
  //         isErrorMessage: true,
  //       });
  //       return;
  //     }

  //     if (
  //       UtilitiesMethods.getSpaceTrimmedLenght(
  //         userDataToBeUpdated[
  //           SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
  //         ]
  //       ) === 0
  //     ) {
  //       props.displayMessagesInParentViewHandler({
  //         message: "Please enter name to proceed, It can't be left blank.",
  //         isErrorMessage: true,
  //       });
  //       return;
  //     }

  //     if (
  //       UtilitiesMethods.getSpaceTrimmedLenght(
  //         userDataToBeUpdated[
  //           SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
  //         ]
  //       ) === 0
  //     ) {
  //       props.displayMessagesInParentViewHandler({
  //         message: "Please enter name to proceed, It can't be left blank.",
  //         isErrorMessage: true,
  //       });
  //       return;
  //     }

  //     // if (
  //     //   UtilitiesMethods.getSpaceTrimmedLenght(userDataToBeUpdated[SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey]) === 0
  //     // ) {
  //     //   props.displayMessagesInParentViewHandler({
  //     //     message: "Please enter password to proceed, It can't be left blank.",
  //     //     isErrorMessage: true,
  //     //   });
  //     //   return;
  //     // }

  //     if (
  //       selectedUserType === "Supervisor" &&
  //       UtilitiesMethods.getSpaceTrimmedLenght(
  //         userDataToBeUpdated[
  //           SuperAdminUtilitiesKeys.getCreateUserDataKeys().userContactKey
  //         ]
  //       ) === 0
  //     ) {
  //       props.displayMessagesInParentViewHandler({
  //         message:
  //           "Please enter contact number to proceed, It can't be left blank.",
  //         isErrorMessage: true,
  //       });
  //       return;
  //     }

  //     if (selectedUserType === "Doctor" || selectedUserType === "Front Desk") {
  //       console.log("userDataToBeUpdated in doctor option");
  //       console.log(userDataToBeUpdated);

  //       AdminAPIHandler.updateUserRegistrationData({
  //         userData: userDataToBeUpdated,
  //         modifyAdminUserDataResponseHandler: modifyAdminUserDataResponseHandler,
  //       });

  //       return;
  //     }

  //     SuperAdminUserRelatedAPIHandler.updateUserData({
  //       userData: userDataToBeUpdated,
  //       modifyUserDataResponseHandler: modifyUserDataResponseHandler,
  //     });
  //   };

  //   const modifyAdminUserDataResponseHandler = (modifiedUserData) => {
  //     console.log("modifyAdminUserDataResponseHandler response data is :");
  //     console.log(modifiedUserData);
  //     if (modifiedUserData.errorMessage === null) {
  //       if (modifiedUserData.isUserDataUpdated === true) {
  //         updateAdminSubUsersDataSuccessHandler(modifiedUserData.userUpdatedData);
  //       }
  //       if (modifiedUserData.isUserDataUpdated === false) {
  //         showErrorMessage({
  //           message: "Some error occured.",
  //           isErrorMessage: true,
  //         });
  //       }
  //     } else if (modifiedUserData.userUpdatedData === null) {
  //       showErrorMessage({
  //         message: modifiedUserData.errorMessage,
  //         isErrorMessage: true,
  //       });
  //     }
  //   };

  //   const modifyUserDataResponseHandler = (modifiedUserData) => {
  //     if (modifiedUserData.errorMessage === null) {
  //       if (modifiedUserData.isUserDataUpdated === true) {
  //         updateUserDataSuccessHandler(modifiedUserData.userUpdatedData);
  //       }
  //       if (modifiedUserData.isUserDataUpdated === false) {
  //         showErrorMessage({
  //           message: "Some error occured.",
  //           isErrorMessage: true,
  //         });
  //       }
  //     } else if (modifiedUserData.userUpdatedData === null) {
  //       showErrorMessage({
  //         message: modifiedUserData.errorMessage,
  //         isErrorMessage: true,
  //       });
  //     }
  //   };

  //   const updateAdminSubUsersDataSuccessHandler = (userModifiedData) => {
  //     console.log("updateUserDataSuccessHandler");
  //     props.updateUserSuccessHandler(userModifiedData);
  //     //props.onUserDataUpdateHandler(userModifiedData);
  //   };

  //   const updateUserDataSuccessHandler = (userModifiedData) => {
  //     console.log("updateUserDataSuccessHandler");
  //     props.onUserDataUpdateHandler(userModifiedData);
  //   };

  //   //message , isErrorMessage
  //   const showErrorMessage = (prop) => {
  //     props.displayMessagesInParentViewHandler({
  //       [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
  //         prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
  //       [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
  //         prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
  //     });

  //     // UtilitiesMethods.showMessageBarAtTheBottom({
  //     //   message: prop.message,
  //     //   isErrorMessage: prop.isErrorMessage,
  //     //   alertMessageElement: props.setAlertMessage,
  //     //   alertMessageFlag: props.setAlertFlag,
  //     // });
  //   };

  //   // messageWithData({
  //   //   [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
  //   //     UtilitiesKeys.getGeneralValidationMessagesText()
  //   //       .phoneNumberNotValidMessage,
  //   //   [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  //   // });

  //   return (
  //     <div className={classes.popup}>
  //       <div className={classes.popup_content}>
  //         <h2> Update User Data </h2>
  //         <form onSubmit={UpdateCredentialSubmitHandler}>
  //           <label htmlFor="userID">User ID:</label>
  //           <input
  //             type="text"
  //             id="userID"
  //             value={
  //               userDataToBeUpdated[
  //                 SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
  //               ]
  //             }
  //             onChange={UpdatedUserIdChangeHandler}
  //           />

  //           {/*if userDatatoBeUpdated has userName field than this will be shown  */}

  //           <label htmlFor="userName">Name:</label>
  //           <input
  //             type="text"
  //             id="userName"
  //             value={
  //               userDataToBeUpdated[
  //                 SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
  //               ]
  //             }
  //             onChange={UpdatedUserNameChangeHandler}
  //           />

  //           {selectedUserType !== UtilitiesKeys.getUserTypeKeys().adminKey &&
  //             selectedUserType !==
  //               UtilitiesKeys.getUserTypeKeys().frontDeskKey && (
  //               <>
  //                 <label htmlFor="userContact">Contact:</label>
  //                 <input
  //                   type="text"
  //                   id="userContact"
  //                   value={
  //                     userDataToBeUpdated[
  //                       SuperAdminUtilitiesKeys.getCreateUserDataKeys()
  //                         .userContactKey
  //                     ]
  //                   }
  //                   onChange={UpdatedUserContactChangeHandler}
  //                 />
  //               </>
  //             )}

  //           {selectedUserType !== "Admin" &&
  //             selectedUserType !== "Supervisor" &&
  //             selectedUserType !== "Doctor" &&
  //             selectedUserType !== "Front Desk" && (
  //               <>
  //                 <label htmlFor="userAddress">Address:</label>
  //                 <input
  //                   type="text"
  //                   id="userAddress"
  //                   // value={userDataToBeUpdated.address}
  //                   value={
  //                     userDataToBeUpdated[
  //                       SuperAdminUtilitiesKeys.getCreateUserDataKeys()
  //                         .userAddressKey
  //                     ]
  //                   }
  //                   onChange={UpdatedUserAddressChangeHandler}
  //                 />
  //               </>
  //             )}

  //           {selectedUserType === "Doctor" && (
  //             <>
  //               <label htmlFor="licenseId">Doctor License ID:</label>
  //               <input
  //                 type="text"
  //                 id="licenseId"
  //                 value={userDataToBeUpdated.licId}
  //                 onChange={UpdatedUserLicenseIdChangeHandler}
  //               />
  //             </>
  //           )}

  //           {selectedUserType === "Doctor" && (
  //             <>
  //               <label htmlFor="specialisation">Doctor Specialization:</label>
  //               <input
  //                 type="text"
  //                 id="specialisation"
  //                 value={userDataToBeUpdated.docSpecialization}
  //                 onChange={UpdatedUserSpecialisationChangeHandler}
  //               />
  //             </>
  //           )}

  //           <label htmlFor="password">Password:</label>
  //           <input
  //             type="text"
  //             id="password"
  //             // value={userDataToBeUpdated.password}
  //             value={
  //               userDataToBeUpdated[
  //                 SuperAdminUtilitiesKeys.getCreateUserDataKeys().userPasswordKey
  //               ]
  //             }
  //             onChange={UpdatedUserPasswordChangeHandler}
  //           />

  //           <input type="submit" value="Update" />
  //           <button className={classes.close_btn} onClick={props.onClose}>
  //             Close
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
};

export default ListDetailView;
