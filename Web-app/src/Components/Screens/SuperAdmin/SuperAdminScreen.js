import React, { useState } from "react";
import classes from "./SuperAdminScreen.module.css";
import NavBar from "../UI Elements/NavBar/NavBar";
import Button from "../UI Elements/Button/Button";
import CreateUser from "./CreateUser";
import AddHospital from "./AddHospital";
import ShowAllUser from "./ShowAllUser";
import HospitalDetailsView from "./HospitalDetailsView";

const SuperAdminScreen = (props) => {
  const [superAdminOption, setSuperAdminOption] = useState("superAdmin");
  const [hospitalDetailsView, setHospitalDetailsView] = useState("");
  const [hospitalsListWithNoAdmin, setHospitalsListtWithNoAdmins] = useState(
    []
  );
  const [selectedHospitalIDForAddUser, setSelectedHospitalIDForAddUser] = useState("");

  const hospitalListsWithNoAdminsCallBackHandler = (hospitalsList) => {
    console.log("hospitalListsWithNoAdminsCallBackHandler in super admin .js");
    console.log(hospitalsList);
    setHospitalsListtWithNoAdmins(hospitalsList);
  };


  const selectedHospitalInDetailViewCallBackHandler = (hospitalData) => {
    console.log("sselectedHospitalInDetailViewCallBackHandler in super admin .js");
    console.log(hospitalData);
    //setSelectedHospitalForAddUser(hospitalData);
    setSelectedHospitalIDForAddUser(hospitalData.hospId);
    // setHospitalsListtWithNoAdmins(hospitalsList);
  };


  const HospitalRegistrationButtonHandler = () => {
    setSuperAdminOption("HospitalRegistration");
  };
  const CreateUserButtonHandler = () => {
    console.log("CU");
    setSuperAdminOption("CreateUserScreen");
  };

  const AllRegisteredUserButtonHandler = () => {
    setSuperAdminOption("AllUsers");
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
          selectedHospitalIDForAddUser = {selectedHospitalIDForAddUser}
        />
      )}
      {superAdminOption === "AllUsers" && (
        <ShowAllUser
          superAdminOption={superAdminOption}
          setSuperAdminOption={setSuperAdminOption}
          setAlertMessage={props.setAlertMessage}
          setAlertFlag={props.setAlertFlag}
        />
      )}
      {hospitalDetailsView === "Admin" && (
        <HospitalDetailsView  hospitalsListData={hospitalsListWithNoAdmin}
          selectedHospitalCallBackHandler = {selectedHospitalInDetailViewCallBackHandler}
        />
      )}
    </div>
  );
};

export default SuperAdminScreen;
{/* hospitalsListData={hospitalsListWithNoAdmin} */}