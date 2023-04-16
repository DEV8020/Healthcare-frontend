import axios from "axios";
import UtilitiesMethods from "../Utilities/UtilitiesMethods";

// const serverURL = `http://192.168.9.225:9191/`;
//const serverURL = `http://172.16.140.248:9191/`;
// const serverURL = `http://192.168.223.225:9191/`;
const serverURL = `http://192.168.219.225:9191/`; //Darshan Server

const getHeaderConfigurationsList = () => {
  return {
    headers: {
      Authorization: "Bearer " + UtilitiesMethods.getAuthTokenForLoggedInUser(),
    },
    validateStatus: function (status) {
      return status == 200 || status == 404;
      // Resolve only if the status code is 202 or 404...
    },
  };
};

const hitCustomResponsePostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);
    console.log("Data post in the API is");
    console.log(props.postData);

    const response = await axios.post(
      url,
      props.postData,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

    console.log("Data recieved");
    console.log(response);

    if (response.status === 200) {
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    } else if (response.status === 404) {
      console.log("404 response");
      console.log(response);
      props.responseDataHandler({
        responseData: null,
        responseError: Error(response.data.message),
      });
    } else {
      console.log("else block");
      console.log(response);
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    }
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const hitPostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);

    const response = await axios.post(
      url,
      props.postData,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

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

const hitGetService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);

    const response = await axios.get(url);

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

const hitCustomResponseGetService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);
    console.log(UtilitiesMethods.getAuthTokenForLoggedInUser());

    // const headers = {
    //   Authorization: `Bearer ${UtilitiesMethods.getAuthTokenForLoggedInUser()}`,
    // };

    const response = await axios.get(
      url,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );
    //   {
    //   headers: {
    //     Authorization:
    //       "Bearer " + UtilitiesMethods.getAuthTokenForLoggedInUser(),
    //   },
    //   validateStatus: function (status) {
    //     return status == 200 || status == 404;
    //     // Resolve only if the status code is 202 or 404...
    //   },
    // }
    // );

    console.log("Data recieved");
    console.log(response);

    if (response.status === 200) {
      props.responseDataHandler({
        responseData: response,
        responseError: null,
      });
    } else if (response.status === 404) {
      // console.log("404 response hitCustomResponseGetService");
      // console.log(response.data.message);
      props.responseDataHandler({
        responseData: null,
        responseError: Error(response.data.message),
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

const hitPutService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);

    const response = await axios.put(url, props.postData);

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

const GlobalServiceHandler = {
  hitPostService,
  hitGetService,
  hitPutService,
  hitCustomResponsePostService,
  hitCustomResponseGetService,
  getHeaderConfigurationsList,
};
export default GlobalServiceHandler;
