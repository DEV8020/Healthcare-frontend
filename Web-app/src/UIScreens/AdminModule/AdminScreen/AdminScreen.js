import classes from "./AdminScreen.module.css";
import Button from "../../../Components/Screens/UI Elements/Button/Button";
import ShowHospitalUsers from "../AllUsersListScreen/ShowHospitalUsers";
import AddDoctor from "../../../UIScreens/AdminModule/CreateUserScreen/AddDoctor";
import AddFrontDesk from "../CreateUserScreen/AddFrontDesk"
import { useState, useEffect } from "react";
// import NavBar from "../UI Elements/NavBar/NavBar";
import NavBar from "../../../Components/Screens/UI Elements/NavBar/NavBar";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const AdminScreen = (props) => {
  const [adminOption, setAdminOption] = useState("admin");
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
    }else{
      setRegisteredUserList([]);
    }
  };

  const ShowHospitalUsersButtonHandler = () => {
    setAdminOption("showHospitalUsers");
    refreshUsersListResponseHandler();
  };
  const AddDoctorButtonHandler = () => {
    setAdminOption("addDoctor");
  };
  const AddFrontDeskButtonHandler = () => {
    setAdminOption("addFrontDesk");
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    UtilitiesMethods.cleanUpUserDataOnLogOut();
    props.setUser(null);
  };
  if (!props.user) return null;
  return (
    <div>
      <NavBar value="Log-out" label="Admin" onClick={logout} />

      <div className={classes.center}>
        <h2> Admin Menu</h2>

        <div className={classes.Admin_menu}>
          <Button
            value="Show Hospital Users"
            onClick={ShowHospitalUsersButtonHandler}
          />

          <Button
            value="Doctor Registration"
            onClick={AddDoctorButtonHandler}
          />

          <Button
            value="FrontDesk Registration"
            onClick={AddFrontDeskButtonHandler}
          />
        </div>
      </div>

      {adminOption === "showHospitalUsers" && (
        <ShowHospitalUsers
          // {adminOption === "addHospital" && (
          //   <AddHospital
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          registeredUserList={registeredUserList}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
        />
      )}

      {adminOption === "addDoctor" && (
        <AddDoctor
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          // setAlertMessage={props.setAlertMessage}
          // setAlertFlag={props.setAlertFlag}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
      {adminOption === "addFrontDesk" && (
        <AddFrontDesk
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          // setAlertMessage={props.setAlertMessage}
          // setAlertFlag={props.setAlertFlag}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
          showMessageAtBottomBar={showMessageAtBottomBar}
        />
      )}
    </div>
  );
};

export default AdminScreen;
