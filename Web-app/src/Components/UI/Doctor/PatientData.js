import classes from './PatientList.module.css'
import React from 'react'


const PatientData = ({ patientData}) => {
   
    return (
        <div className={classes.plist} >
             Name:{patientData.name}
             <div>Age:{patientData.age}</div> 
             <div>Sex:{patientData.sex}</div>
             <div>Contact:{patientData.contact}</div>  
             {/* <div>Pid:  {patientData.patient.p_id}</div>
            <div>       {patientData.patient.name}</div>
            <div>       {patientData.patient.age}</div>
            <div>       {patientData.patient.sex}</div>
             <div>      {patientData.patient.contact}</div> */}
             <div className={classes.select}>
                
                <button className={classes.select_btn}>
                    select
                </button>
            </div> 
            
        </div>
    )
}

export default PatientData