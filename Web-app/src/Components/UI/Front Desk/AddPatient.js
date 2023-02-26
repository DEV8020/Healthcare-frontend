import React,{useState} from 'react'
import InputField from "../UI Elements/Input Field/InputField";
import Button from "../UI Elements/Button/Button";
import classes from "./AddPatient.module.css";

const AddPatient = (props) => {
    
    const [PatientId,setPatientId] = useState('');
    
    const PatientIdChangeHandler=(event)=>{
        setPatientId(event.target.value);
    };

    const AddAppointmentHandler=(event)=>{
        event.preventDefault();

        console.log(PatientId);
        props.onCreateAppointment(PatientId);
        setPatientId('');
    }
    const logout = () => {
        window.localStorage.removeItem('loggedInUser')
        props.setUser(null)
      }
      if (!(props.user))
      return null
      


    return (
      <div className={classes.addpatient}>
        <form className={classes.form} onSubmit={AddAppointmentHandler}>
        <header>
        <h2>HOSPITAL SYSTEM</h2>
        </header>
     
     <br />
         
          <InputField placeHolder="Patient ID" type="text" isRequired={true} onChange={PatientIdChangeHandler}/>
          <br />
  
          <button className = {classes.button} type="submit" >Add Appointment</button>
          <button className = {classes.button} type="button"  onClick={logout}>Logout</button>
          <br />
          <br />
        </form>
      </div>
    );
  };
  
  export default AddPatient;