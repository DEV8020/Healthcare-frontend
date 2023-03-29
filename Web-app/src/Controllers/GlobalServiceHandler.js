import axios from "axios";

//const serverURL = `http://192.168.9.225:9191/`;
const serverURL = `http://172.16.140.248:9191/`;

const hitPostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);
    
    const response = await axios.post(url, props.postData);

    console.log("Data recieved");
    console.log(response);

    if (response.status === 200) {
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    } else {
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    }
  } catch (error) {
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const GlobalServiceHandler = { hitPostService };
export default GlobalServiceHandler;
