import axios from 'axios'


const addDoctorUrl = `http://192.168.199.225:9191/addPendingQueue/1`


const AddDoctorService = async (doctorData) => {
    
    const response = await axios.post(`${addDoctorUrl}/${doctorData}`,{
        headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
    })
    return response.data
}

export default AddDoctorService