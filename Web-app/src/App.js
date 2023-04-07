import "./App.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Login from "./Components/Screens/Login/Login";
// import AddPatient from "./Components/Screens/Front Desk/CreateAppointment";
// import addAppointment from "./Services/Appointment";
// import getPatientList from "./Services/PatientList";
// import PatientList from "./Components/Screens/Doctor/PatientList";
// import AlertTitle from "@mui/material/AlertTitle";
// import CreateUser from "./Components/Screens/SuperAdmin/CreateUser";
// import AddHospital from "./Components/Screens/SuperAdmin/AddHospital";
import AdminScreen from "./Components/Screens/AdminUI/AdminScreen";
import DoctorScreen from "./Components/Screens/Doctor/DoctorScreen";
import FrontDeskScreen from "./Components/Screens/Front Desk/FrontDeskScreen";
import SuperVisorScreen from "./Components/Screens/Supervisor/SuperVisorScreen";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SuperAdminScreen from "./Components/Screens/SuperAdmin/SuperAdminScreen";

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
  // const CreateAppointmentHandler = async (appointment) => {
  //   console.log(appointment);

  //   // try {
  //   //   await addAppointment(appointment);
  //   // } catch (exception) {
  //   //   console.log(exception);
  //   // }
  // };
  // useEffect(() => {
  //   async function fetchData() {
  //     if (user !== null && user.userType === "doctor") {
  //       // const patientListObject = await getPatientList();

  //       // setPatientList(patientListObject);
  //       setPatientList(pList);
  //     }
  //   }
  //   fetchData();
  // }, [user]);

  //  useEffect(() => {
  //    const loggedInUser = window.localStorage.getItem('loggedInUser')
  //    if (loggedInUser)
  //      setUser(loggedInUser)
  //  }, [])
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
        //<AddPatient onCreateAppointment={CreateAppointmentHandler} user={user} setUser={setUser} />
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
