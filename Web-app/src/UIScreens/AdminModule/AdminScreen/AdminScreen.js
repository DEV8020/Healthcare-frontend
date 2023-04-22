import classes from "./AdminScreen.module.css";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import ShowHospitalUsers from "../AllUsersListScreen/ShowHospitalUsers";
import AddDoctor from "../../../UIScreens/AdminModule/CreateUserScreen/AddDoctor";
import AddFrontDesk from "../CreateUserScreen/AddFrontDesk";
import { useState, useEffect } from "react";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
// import AdminUtilitiesKeys from "../AdminUtilitiesKeys/AdminUtilitiesKeys";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";

const AdminScreen = (props) => {
  const [adminOption, setAdminOption] = useState(AdminUtilities.getAdminMenuOptionsNameKeys().createDoctorKey);
  const [isUserListDataToLoad, setIsUserListDataToLoad] = useState(true);
  const [registeredUserList, setRegisteredUserList] = useState(true);

  useEffect(() => {
    console.log("All registered user list API called in Admin View");
    AdminAPIHandler.GetAdminAllRegisteredUserList({
      showAllRegisteredUserResponseHandler:
        showAllRegisteredUserResponseHandler,
    });
  }, [isUserListDataToLoad]);

  const refreshUsersListResponseHandler = () => {
    setIsUserListDataToLoad((isToBeLoad) => {
      return !isToBeLoad;
    });
  };

  const showMessageAtBottomBar = (prop) => {
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        prop[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });

    // UtilitiesKeys
    // props.showMessageAtBottomBar({});
  };

  const showAllRegisteredUserResponseHandler = (
    allRegisteredUsersResponseData
  ) => {
    // console.log(
    //   "showAllRegisteredUserResponseHandler allRegisteredUsersResponseData"
    // );
    console.log(allRegisteredUsersResponseData);
    if (allRegisteredUsersResponseData.isRegisteredUsersListRecieved === true) {
      // console.log("Response of user egistered list recieved...");
      // console.log(allRegisteredUsersResponseData.registeredUserListData);
      setRegisteredUserList(
        allRegisteredUsersResponseData.registeredUserListData
      );
    } else {
      setRegisteredUserList([]);
    }
  };

  const ShowHospitalUsersButtonHandler = () => {
    setAdminOption(AdminUtilities.getAdminMenuOptionsNameKeys().showHospitalsUsersKey);
    refreshUsersListResponseHandler();
  };
  const AddDoctorButtonHandler = () => {
    setAdminOption(AdminUtilities.getAdminMenuOptionsNameKeys().createDoctorKey);
  };
  const AddFrontDeskButtonHandler = () => {
    setAdminOption(AdminUtilities.getAdminMenuOptionsNameKeys().createFrontDeskKey);
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;
  return (
    <div>
      <NavBar value={UtilitiesKeys.getLogOutButtonText()} label="Admin" onClick={logout} />

      <div className={classes.center}>
        <h2> Admin Menu</h2>

        <div className={classes.Admin_menu}>
          <Button
            value={
              AdminUtilities.getAdminMenuOptionsLabelKeys()
                .showHospitalsUsersKey
            }
            onClick={ShowHospitalUsersButtonHandler}
          />

          <Button
            value={
              AdminUtilities.getAdminMenuOptionsLabelKeys().createDoctorKey
            }
            onClick={AddDoctorButtonHandler}
          />

          <Button
            value={
              AdminUtilities.getAdminMenuOptionsLabelKeys()
                .createFrontDeskKey
            }
            onClick={AddFrontDeskButtonHandler}
          />
        </div>
      </div>

      {adminOption ===
        AdminUtilities.getAdminMenuOptionsNameKeys()
          .showHospitalsUsersKey && (
        <ShowHospitalUsers
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          registeredUserList={registeredUserList}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}

      {adminOption ===
        AdminUtilities.getAdminMenuOptionsNameKeys().createDoctorKey && (
        <AddDoctor
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
      {adminOption ===
        AdminUtilities.getAdminMenuOptionsNameKeys().createFrontDeskKey && (
        <AddFrontDesk
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
    </div>
  );
};

export default AdminScreen;
