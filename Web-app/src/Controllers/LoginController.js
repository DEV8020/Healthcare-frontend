import axios from "axios";

const loginUrl = `http://192.168.9.225:9191/login`;

const GetUserLoginData = async (userData) => {
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'
  console.log("called from LoginController");
  console.log(userData);
  // const response = await axios.post(loginUrl, userData);
  console.log("LoginController respone recieved");
  // console.log(response);

  // axios.post("http://172.16.140.248:9191/login", userData, { withCredentials: true })
  // .then((res) => {
  //   if (res.status === 200) {
  //     //all cookies are set in you're browser
  //     console.log(res);
  //   }
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //  const response = await axios.post(`${appointmentUrl}/${PatientId}`,{
  //             headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
  //         })
  //         return response.data
};

const LoginController = { GetUserLoginData };
export default LoginController;

// import axios from 'axios'

// const appointmentUrl = `http://192.168.199.225:9191/addPendingQueue/1`

// const addAppointment = async (PatientId) => {

//     const response = await axios.post(`${appointmentUrl}/${PatientId}`,{
//         headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
//     })
//     return response.data
// }
