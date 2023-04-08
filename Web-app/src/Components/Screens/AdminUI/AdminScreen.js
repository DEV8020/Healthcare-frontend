import classes from "./AdminScreen.module.css";
import Button from "../UI Elements/Button/Button";
import ShowHospitalUsers from "./ShowHospitalUsers";
import AddDoctor from "./AddDoctor";
import AddFrontDesk from "./AddFrontDesk";
import { useState, useEffect } from "react";
import NavBar from "../UI Elements/NavBar/NavBar";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";

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
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
        />
      )}
      {adminOption === "addFrontDesk" && (
        <AddFrontDesk
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
          refreshUsersListResponseHandler={refreshUsersListResponseHandler}
        />
      )}
    </div>
  );
};

export default AdminScreen;
