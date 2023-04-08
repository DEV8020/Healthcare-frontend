import GlobalServiceHandler from "./GlobalServiceHandler";

const GetUserLoginData = async (props) => {
    console.log(props.userData);
  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      console.log(loginServiceData);
      if (loginServiceData.responseError === null) {
        props.userLoginResponseHandler({
          isLoginFlag : true,
          loggedInUserData: loginServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (loginServiceData.responseData === null) {
        console.log("Entered in error block");
        console.log(loginServiceData.responseError.message);
        props.userLoginResponseHandler({
          isLoginFlag: false,
          loggedInUserData : null,
          errorMessage: loginServiceData.responseError.message,
        });
      }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
