import axios from "axios";
import GlobalServiceHandler from "./GlobalServiceHandler";

// const loginUrl = `http://192.168.9.225:9191/login`;

const GetUserLoginData = async (props) => {
  const response = await GlobalServiceHandler.hitPostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      console.log("loginServiceData called");
      console.log(loginServiceData.responseData);
      console.log(loginServiceData.responseError);

      // {console.log(loginServiceData.responseData);
      //     responseData: response.data,
      //     responseError: null,
      //   }

      //   var userResponseData = { isLoginFlag: response.data, errorMessage: null };

      if (loginServiceData.responseError === null) {
        props.userLoginResponseHandler({
            isLoginFlag: loginServiceData.responseData.data,
            errorMessage: null,
          });
      } else if (loginServiceData.responseData === null) {
        props.userLoginResponseHandler({
          isLoginFlag: null,
          errorMessage: loginServiceData.responseError.message,
        });
      }

    //   var userResponseData = {
    //     isLoginFlag: loginServiceData.responseData,
    //     errorMessage: loginServiceData.responseError.message,
    //   };

    //   props.userLoginResponseHandler(userResponseData);
    },
  });
  //await axios.post(loginUrl, props.userData);

  //   console.log("GetUserLoginData");
  //   console.log(response);

  //   try {
  //     console.log("GetUserLoginData called user data");
  //     console.log(props.userData);
  //     const response = await axios.post(loginUrl, props.userData);

  //     console.log("Data Response from Login Controller is :" + response.data);
  //     var userResponseData = { isLoginFlag: response.data, errorMessage: null };

  //     if (response.status === 200) {
  //       props.userLoginResponseHandler(userResponseData);
  //     } else {
  //       props.userLoginResponseHandler(userResponseData);
  //     }
  //   } catch (error) {
  //     props.userLoginResponseHandler({
  //       isLoginFlag: null,
  //       errorMessage: error.message,
  //     });
  //   }
};

const LoginController = { GetUserLoginData };
export default LoginController;
