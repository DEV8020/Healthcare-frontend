import axios from 'axios'


const addHospitalUrl = `http://192.168.199.225:9191/addPendingQueue/1`


const AddHospitalService = async (hospitalData) => {
    
    const response = await axios.post(`${addHospitalUrl}/${hospitalData}`,{
        headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
    })
    return response.data
}

export default AddHospitalService