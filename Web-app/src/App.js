import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./UIScreens/LoginModule/Login/Login";
import AdminScreen from "./UIScreens/AdminModule/AdminScreen/AdminScreen";
import DoctorScreen from "./UIScreens/DoctorModule/DoctorScreen/DoctorScreen";
import FrontDeskScreen from "./UIScreens/FrontDeskModule/FrontDeskScreen/FrontDeskScreen";
import SuperVisorScreen from "./UIScreens/SupervisorModule/SupervisorScreen/SuperVisorScreen";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SuperAdminScreen from "./UIScreens/SuperAdminModule/SuperAdminScreen/SuperAdminScreen";
import UtilitiesKeys from "./Utilities/UtilitiesKeys";
import LoginUtilities from "./UIScreens/LoginModule/LoginUtilities/LoginUtilities";

function App() {

  const [user, setUser] = useState(null);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState("info");

  const OnLoginHandler = (userObject) => {
    console.log("OnLoginHandler");
    console.log(userObject);
    window.localStorage.setItem("loggedInUser", userObject);
    setUser(userObject);
  };

  const showBottomMessageBar = (errorMessageData) => {
    console.log("**************************************");
    console.log(errorMessageData);
    if(errorMessageData[UtilitiesKeys.getErrorMessageDataKeys().messageType] === null){
     setAlertInfo("success");
    }else{
      setAlertInfo(errorMessageData[UtilitiesKeys.getErrorMessageDataKeys().messageType]);
    }
    setAlertMessage(errorMessageData[UtilitiesKeys.getErrorMessageDataKeys().messageKey]);
    setAlertFlag(true);
  };


  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setAlertFlag(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alertFlag]);

  return (
    <>
      {alertFlag === true && (
        <Snackbar open={alertFlag}>
          <Alert severity={alertInfo} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
      {user === null && (
        <Login
          onLogin={OnLoginHandler}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}

      {user !== null && user[LoginUtilities.getLoginDataKeys().userRoleKey] === LoginUtilities.getLoginUserTypeKeys().frontDeskTypeKey && (
        <FrontDeskScreen
          user={user}
          setUser={setUser}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}
      {user !== null && user[LoginUtilities.getLoginDataKeys().userRoleKey] === LoginUtilities.getLoginUserTypeKeys().doctorTypeKey && (
        <DoctorScreen
          user={user}
          setUser={setUser}
          showBottomMessageBar={showBottomMessageBar}
          // setAlertFlag={setAlertFlag}
          // setAlertMessage={setAlertMessage}
        />
      )}
      {user !== null && user[LoginUtilities.getLoginDataKeys().userRoleKey] === LoginUtilities.getLoginUserTypeKeys().superAdminTypeKey && (
        <SuperAdminScreen
          user={user}
          setUser={setUser}
          // setAlertFlag={setAlertFlag}
          // setAlertMessage={setAlertMessage}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}
      {user !== null && user[LoginUtilities.getLoginDataKeys().userRoleKey] === LoginUtilities.getLoginUserTypeKeys().adminTypeKey && (
        <AdminScreen
          user={user}
          setUser={setUser}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}

      {user !== null && user[LoginUtilities.getLoginDataKeys().userRoleKey] === LoginUtilities.getLoginUserTypeKeys().supervisorTypeKey && (
        <SuperVisorScreen
          user={user}
          setUser={setUser}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}
    </>
  );
}

export default App;
