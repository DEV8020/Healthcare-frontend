import React, { useState, useEffect } from "react";
import classes from "./SuperAdminScreen.module.css";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import CreateUser from "../CreateUserScreen/CreateUser";
import AddHospital from "../AddHospitalScreen/AddHospital";
import ShowAllUser from "../AllUsersListScreen/ShowAllUser";
import HospitalDetailsView from "../HospitalDetailsScreen/HospitalDetailsView";
import SuperAdminAPIHandler from "../../../Controllers/SuperAdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import SuperAdminUtilitiesKeys from "../SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const SuperAdminScreen = (props) => {
  const [superAdminOption, setSuperAdminOption] = useState(
    SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
      .hospitalRegistrationKey
  );
  const [hospitalDetailsView, setHospitalDetailsView] = useState("");
  const [hospitalsListWithNoAdmin, setHospitalsListtWithNoAdmins] = useState(
    []
  );
  const [allRegisteredUsersList, setAllRegisteredUsersList] = useState([]);
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] =
    useState("");
  const [isUserListDataToLoad, setIsUserListDataToLoad] = useState(true);

  //User Registration Data initalise with Initial Data...
  const [
    selectedHospitalDataForAdminCreation,
    setSelectedHospitalDataForAdminCreation,
  ] = useState(SuperAdminUtilitiesKeys.getCreateUserInitialData());

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

  // useEffect(() => {
  //   setSuperAdminOption(
  //     SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
  //       .hospitalRegistrationKey
  //   );
  // }, []);

  //########################## Getting List Of All Registered Users... ##########################

  useEffect(() => {
    console.log("All registered user list API called");
    SuperAdminAPIHandler.GetSuperAdminAllRegisteredUserList({
      showAllRegisteredUserResponseHandler:
        showAllRegisteredUserResponseHandler,
    });
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
    setSelectedHospitalDataForAdminCreation(updatedData);
  };

  const HospitalRegistrationButtonHandler = () => {
    setSuperAdminOption(
      SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
        .hospitalRegistrationKey
    );
  };

  const CreateUserButtonHandler = () => {
    console.log("CU");
    setSuperAdminOption(
      SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
        .createNewUserKey
    );
  };

  const AllRegisteredUserButtonHandler = () => {
    setSuperAdminOption(
      SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
        .registeredUsersListKey
    );
    updateUserListAfterDataUpdateHandler();
  };

  const logoutSA = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;

  return (
    <div>
      <NavBar value={UtilitiesKeys.getLogOutButtonText()} label="SuperAdmin" onClick={logoutSA} />

      <div className={classes.center}>
        <h2> SuperAdmin Menu</h2>

        <div className={classes.SA_menu}>
          <Button
            value={
              SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsLabelKeys()
                .hospitalRegistrationKey
            }
            onClick={HospitalRegistrationButtonHandler}
          />
          <Button
            value={
              SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsLabelKeys()
                .createNewUserKey
            }
            onClick={CreateUserButtonHandler}
          />
          <Button
            value={
              SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsLabelKeys()
                .registeredUsersListKey
            }
            onClick={AllRegisteredUserButtonHandler}
          />
        </div>
      </div>

      {superAdminOption ===
        SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
          .hospitalRegistrationKey && (
        <AddHospital
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          showBottomMessageBar={props.showBottomMessageBar}
        />
      )}
      {superAdminOption ===
        SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
          .createNewUserKey && (
        <CreateUser
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          showBottomMessageBar={props.showBottomMessageBar}
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
      {superAdminOption ===
        SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
          .registeredUsersListKey && (
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
          showBottomMessageBar={props.showBottomMessageBar}
        />
      )}
      {hospitalDetailsView === "Admin" &&
        superAdminOption ===
          SuperAdminUtilitiesKeys.getSuperAdminMenuOptionsNameKeys()
            .createNewUserKey && (
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
