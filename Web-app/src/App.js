import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";
import Login from "./Components/UI/Login/Login";
import AddPatient from "./Components/UI/Front Desk/CreateAppointment";
import addAppointment from "./Services/Appointment";
import getPatientList from "./Services/PatientList";
import PatientList from "./Components/UI/Doctor/PatientList";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CreateUser from "./Components/UI/SuperAdmin/CreateUser";
import AddHospital from "./Components/UI/AdminUI/AddHospital";
import AdminScreen from "./Components/UI/AdminUI/AdminScreen";
import DoctorScreen from "./Components/UI/Doctor/DoctorScreen";
import FrontDeskScreen from "./Components/UI/Front Desk/FrontDeskScreen";

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

  const OnLoginHandler = (userObject) => {
    console.log(userObject.user_type);
    window.localStorage.setItem("loggedInUser", userObject);
    setUser(userObject);
  };
  const CreateAppointmentHandler = async (appointment) => {
    console.log(appointment);

    try {
      await addAppointment(appointment);
    } catch (exception) {
      console.log(exception);
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (user !== null && user.user_type === "Doctor") {
        // const patientListObject = await getPatientList();

        // setPatientList(patientListObject);
        setPatientList(pList);
      }
    }
    fetchData();
  }, [user]);

  //  useEffect(() => {
  //    const loggedInUser = window.localStorage.getItem('loggedInUser')
  //    if (loggedInUser)
  //      setUser(loggedInUser)
  //  }, [])

  return (
    <>
      {user === null && <Login onLogin={OnLoginHandler} />}

      {user !== null && user.user_type === "Front Desk" && (
        <FrontDeskScreen
          user={user}
          setUser={setUser}
        />
      )}
      {
        user !== null && user.user_type === "Doctor" && (
          <DoctorScreen
            
            user={user}
            setUser={setUser}
          />
        )
        //<AddPatient onCreateAppointment={CreateAppointmentHandler} user={user} setUser={setUser} />
      }
      {user !== null && user.user_type === "Super Admin" && (
        <CreateUser user={user} setUser={setUser} />
      )}
{user !== null && user.user_type === "Admin" && (
        <AdminScreen  user={user} setUser={setUser} />
      )}

      {/* <h2>Let's get started!!!</h2> */}
    </>
  );
}

export default App;
