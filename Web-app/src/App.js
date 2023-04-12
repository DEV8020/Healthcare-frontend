import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./UIScreens/LoginModule/Login/Login";
import AdminScreen from "./UIScreens/AdminModule/AdminScreen/AdminScreen";
import DoctorScreen from "./Components/Screens/Doctor/DoctorScreen";
import FrontDeskScreen from "./UIScreens/FrontDeskModule/FrontDeskScreen/FrontDeskScreen";
import SuperVisorScreen from "./Components/Screens/Supervisor/SuperVisorScreen";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SuperAdminScreen from "./UIScreens/SuperAdminModule/SuperAdminScreen/SuperAdminScreen";

function App() {
  const pList = [
    {
      p_id: "p1",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    { p_id: "p2", name: "john", age: 12, sex: "m", contact: 1234567890 },
    {
      p_id: "p3",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p4",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p5",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p6",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p7",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p8",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p9",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
    {
      p_id: "p10",
      name: "john",
      age: 12,
      sex: "m",
      contact: 1234567890,
    },
  ];

  const [user, setUser] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const OnLoginHandler = (userObject) => {
    console.log(userObject.userType);
    window.localStorage.setItem("loggedInUser", userObject);
    setUser(userObject);
  };
  
  useEffect(() => {
    async function fetchData() {
      if (user !== null && user.userType === "doctor") {
        setPatientList(pList);
      }
    }
    fetchData();
  }, [user]);

  
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
          <Alert severity="success" sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
      {user === null && (
        <Login
          onLogin={OnLoginHandler}
          setAlertFlag={setAlertFlag}
          setAlertMessage={setAlertMessage}
        />
      )}

      {user !== null && user.userType === "Front Desk" && (
        <FrontDeskScreen
          user={user}
          setUser={setUser}
          setAlertFlag={setAlertFlag}
          setAlertMessage={setAlertMessage}
        />
      )}
      {
        user !== null && user.userType === "Doctor" && (
          <DoctorScreen
            user={user}
            setUser={setUser}
            setAlertFlag={setAlertFlag}
            setAlertMessage={setAlertMessage}
          />
        )
      }
      {user !== null && user.userType === "Super Admin" && (
        <SuperAdminScreen
          user={user}
          setUser={setUser}
          setAlertFlag={setAlertFlag}
          setAlertMessage={setAlertMessage}
        />
      )}
      {user !== null && user.userType === "Admin" && (
        <AdminScreen
          user={user}
          setUser={setUser}
          setAlertFlag={setAlertFlag}
          setAlertMessage={setAlertMessage}
        />
      )}

      {user !== null && user.userType === "Supervisor" && (
        <SuperVisorScreen
          user={user}
          setUser={setUser}
          setAlertFlag={setAlertFlag}
          setAlertMessage={setAlertMessage}
        />
      )}
    </>
  );
}

export default App;
