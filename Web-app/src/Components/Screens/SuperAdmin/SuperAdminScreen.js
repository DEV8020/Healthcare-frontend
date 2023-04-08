import React, { useState, useEffect } from "react";
import classes from "./SuperAdminScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import CreateUser from "./CreateUser";
import AddHospital from "./AddHospital";
import ShowAllUser from "./ShowAllUser";
import HospitalDetailsView from "./HospitalDetailsView";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

const SuperAdminScreen = (props) => {
  const [superAdminOption, setSuperAdminOption] = useState("superAdmin");
  const [hospitalDetailsView, setHospitalDetailsView] = useState("");
  const [hospitalsListWithNoAdmin, setHospitalsListtWithNoAdmins] = useState(
    []
  );
  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] =
    useState("");
  const [isUserListDataToLoad, setIsUserListDataToLoad] = useState(true);

  const [
    selectedHospitalDataForAdminCreation,
    setSelectedHospitalDataForAdminCreation,
  ] = useState({
    name: "",
    userId: "",
    password: "",
    userType: "",
    hospitalId: "",
    contact : "",
    address : "",
  });

  const allRegisteredListHandleCallBack = (registeredUsersList) => {
    console.log("registeredUsersList");
    console.log(registeredUsersList);
    setAllRegisteredUsersList(registeredUsersList);
  };

  const registeredUserUpdateHandleCallBack = (registeredUsersList) => {
    console.log("registeredUsersList");
    console.log(registeredUsersList);
    setAllRegisteredUsersList(registeredUsersList);
  };

  //########################## Getting List Of All Registered Users... ##########################

  // Clean Code

  // console.log("user list after getting all user data");
  // console.log(allRegisteredUsersList);

  useEffect(() => {
    console.log("All registered user list API called");
    SuperAdminAPIHandler.GetSuperAdminAllRegisteredUserList({
      showAllRegisteredUserResponseHandler:
        showAllRegisteredUserResponseHandler,
    });
    // }
  }, [isUserListDataToLoad]);

  const showAllRegisteredUserResponseHandler = (
    allRegisteredUsersResponseData
  ) => {
    console.log(
      "showAllRegisteredUserResponseHandler allRegisteredUsersResponseData in super admin screen"
    );
    console.log(allRegisteredUsersResponseData);
    if (allRegisteredUsersResponseData.isRegisteredUsersListRecieved === true) {
      setAllRegisteredUsersList(
        allRegisteredUsersResponseData.registeredUserListData
      );
    }
  };

  const updateUserListAfterDataUpdateHandler = () => {
    // console.log("updateUserListAfterDataUpdateHandler called in superadminscreen.js");
    setIsUserListDataToLoad((isListToUpdate) => {
      return !isListToUpdate;
    });
  };



  //########################## Getting List Of All Registered Users... ##########################

  const hospitalListsWithNoAdminsCallBackHandler = (hospitalsList) => {
    setHospitalsListtWithNoAdmins(hospitalsList);
  };

  const selectedHospitalInDetailViewCallBackHandler = (hospitalData) => {
    setSelectedHospitalDataForAdminCreation((hospitalAdminData) => {
      return { ...hospitalAdminData, hospitalId: hospitalData.hospId };
    });
  };

  const HospitalRegistrationDataUpdateCallBackHandler = (updatedData) => {
    // console.log("HospitalRegistrationDataUpdateCallBackHandler");
    // console.log(updatedData);
    setSelectedHospitalDataForAdminCreation(updatedData);
  };

  const HospitalRegistrationButtonHandler = () => {
    setSuperAdminOption("HospitalRegistration");
    updateUserListAfterDataUpdateHandler();
  };
  const CreateUserButtonHandler = () => {
    console.log("CU");
    setSuperAdminOption("CreateUserScreen");
    updateUserListAfterDataUpdateHandler();
  };

  const AllRegisteredUserButtonHandler = () => {
    setSuperAdminOption("AllUsers");
    updateUserListAfterDataUpdateHandler();
  };

  const logoutSA = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <NavBar value="Log-out" label="SuperAdmin" onClick={logoutSA} />

      <div className={classes.center}>
        <h2> SuperAdmin Menu</h2>

        <div className={classes.SA_menu}>
          <Button
            value="Hospital Registration"
            onClick={HospitalRegistrationButtonHandler}
          />

          <Button value="Create New User" onClick={CreateUserButtonHandler} />
          <Button
            value="All registered Users"
            onClick={AllRegisteredUserButtonHandler}
          />
        </div>
      </div>

      {superAdminOption === "HospitalRegistration" && (
        <AddHospital
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {superAdminOption === "CreateUserScreen" && (
        <CreateUser
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          setHospitalDetailsView={setHospitalDetailsView}
          hospitalListsWithNoAdminsCallBackHandler={
            hospitalListsWithNoAdminsCallBackHandler
          }
          hospitalsListWithNoAdmin={hospitalsListWithNoAdmin}
          selectedHospitalIDForAddUser={selectedHospitalIDForAddUser}
          selectedHospitalDataForAdminCreation={
            selectedHospitalDataForAdminCreation
          }
          setSelectedHospitalDataForAdminCreation={
            setSelectedHospitalDataForAdminCreation
          }
          HospitalRegistrationDataUpdateCallBackHandler={
            HospitalRegistrationDataUpdateCallBackHandler
          }
        />
      )}
      {superAdminOption === "AllUsers" && (
        <ShowAllUser
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          registeredUsersList={allRegisteredUsersList}
          allRegisteredListHandleCallBack={allRegisteredListHandleCallBack}
          registeredUserUpdateHandleCallBack={
            registeredUserUpdateHandleCallBack
          }
          updateUserListAfterDataUpdateHandler={
            updateUserListAfterDataUpdateHandler
          }
        />
      )}
      {hospitalDetailsView === "Admin" &&
        superAdminOption === "CreateUserScreen" && (
          <HospitalDetailsView
            hospitalsListData={hospitalsListWithNoAdmin}
            selectedHospitalCallBackHandler={
              selectedHospitalInDetailViewCallBackHandler
            }
          />
        )}
    </div>
  );
};

export default SuperAdminScreen;
