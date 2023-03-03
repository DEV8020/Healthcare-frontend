import "./App.css";
import React,{useState} from 'react';
import {useEffect} from "react";
import Login from "./Components/UI/Login/Login";
import AddPatient from "./Components/UI/Front Desk/AddPatient";
import addAppointment from './Services/Appointment'
import getPatientList from "./Services/PatientList";
import PatientList from "./Components/UI/Doctor/PatientList";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function App() {

  const pList = [
    {
      pid: 'p1',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    { pid: 'p2',
    name: 'john',
    age: 12,
    sex:'m',
    contact:1234567890},
    {
      pid: 'p3',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p4',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p5',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p6',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p7',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p8',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p9',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
    {
      pid: 'p10',
      name: 'john',
      age: 12,
      sex:'m',
      contact:1234567890
    },
  ];
  
  const[user,setUser] = useState(null);
  const[patientList,setPatientList] = useState([]);
  
  const OnLoginHandler=(userObject)=>{
    console.log(userObject.user_type);
    window.localStorage.setItem('loggedInUser',userObject);
    setUser(userObject);

   
  }
const CreateAppointmentHandler= async(appointment)=>{
console.log(appointment);



try{
  await addAppointment(appointment);
}
catch (exception) {
  <Alert severity="error">
        <AlertTitle>Error!!!</AlertTitle>
        
      </Alert>
  console.log(exception);
}

}
useEffect(() => {
  async function fetchData() {
    if (user !== null && user.user_type === 'Doctor') {
     try{ const patientListObject = await getPatientList();}
     catch(exception){
      <Alert severity="error">
        <AlertTitle>Error!!!</AlertTitle>
        
      </Alert>
  console.log(exception);
     }
      setPatientList(patientListObject)
    //  setPatientList(pList); 
    }
  }
  fetchData()
}, [user])

//  useEffect(() => {
//    const loggedInUser = window.localStorage.getItem('loggedInUser')
//    if (loggedInUser)
//      setUser(loggedInUser)
//  }, [])


  return (
    <>
    {user === null && 
    <Login onLogin={OnLoginHandler}/>
    }
    


    {
      user !== null && user.user_type === 'Front Desk' &&
      <AddPatient onCreateAppointment={CreateAppointmentHandler} user={user} setUser={setUser} />
    }
     {
       user !== null && user.user_type === 'Doctor' &&
       <PatientList
       patientList={patientList}
       user={user}
       setUser={setUser}
     />
       //<AddPatient onCreateAppointment={CreateAppointmentHandler} user={user} setUser={setUser} />
    }
    
      {/* <h2>Let's get started!!!</h2> */}
    </>
  );
}

export default App;