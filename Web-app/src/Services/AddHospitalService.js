import axios from "axios";

const addHospitalUrl = `http://192.168.9.225:9191/addHospital`;

const AddHospitalService = async (hospitalData) => {
  const response = await axios.post(addHospitalUrl, hospitalData);
  console.log(response.data);
  return response.data;
};

export default AddHospitalService;
