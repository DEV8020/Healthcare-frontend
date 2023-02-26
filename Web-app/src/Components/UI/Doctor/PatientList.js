import React from 'react'
import PatientData from './PatientData'
import classes from './PatientList.module.css'


const PatientList = (props) => {
    
    const logout = (props) => {
        window.localStorage.removeItem('loggedInUser')
        props.setUser(null)
      }
      if (!(props.user))
      return null
    
    if (props.patientList === [])
        return null

    return (
        <div id="patientlist">
            <h2 >Patient Appointment List</h2>
            <table cellPadding={10}>
                <tr>
                    {/* <th>Patient ID</th> */}
                    <th> Name</th>
                    <th> Age</th>
                    <th> Gender</th>
                    <th> Phone</th>
                </tr>
                {
                   
                   props.patientList.map(b =>
                        <PatientData
                            patientData={b}
                            key={b.pen_id}
                        />
                    )
                }
            </table>
            <button className = {classes.button} type="button"  onClick={logout}>Logout</button>

        </div>
    )
}

export default PatientList