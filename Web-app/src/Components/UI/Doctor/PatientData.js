import classes from './PatientList.module.css'
import React from 'react'


const PatientData = ({ patientData}) => {
   
    return (
        <tr>
            {/* <td>{patientData.pId}</td> */}
            <td>{patientData.patient.name}</td>
            <td>{patientData.patient.age}</td>
            <td>{patientData.patient.sex}</td>
             <td>{patientData.patient.contact}</td>
            <td>
                
                <button className={classes.button}>
                    select
                </button>
            </td>
        </tr>
    )
}

export default PatientData