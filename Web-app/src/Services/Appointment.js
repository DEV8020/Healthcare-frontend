import axios from 'axios'


const appointmentUrl = `http://192.168.57.225:9191/addPendingQueue/1`


const addAppointment = async (PatientId) => {
    
    const response = await axios.post(`${appointmentUrl}/${PatientId}`,{
        headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
    })
    return response.data
}

export default addAppointment