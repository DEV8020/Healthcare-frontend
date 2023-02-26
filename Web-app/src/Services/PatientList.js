import axios from 'axios'

const patientListUrl =`http://192.168.57.225:9191/pendingQueue/1`

const getPatientList = async (employee) => {
   
    const response = await axios.get(`${patientListUrl}`)
  
    return response.data
}

export default getPatientList