import axios from 'axios'


const createUserUrl = `http://192.168.199.225:9191/addPendingQueue/1`


const createUser = async (userData) => {
    
    const response = await axios.post(`${createUserUrl}/${userData}`,{
        headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
    })
    return response.data
}

export default createUser