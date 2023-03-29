import GlobalServiceHandler from "./GlobalServiceHandler";

const GetUserLoginData = async (props) => {
  await GlobalServiceHandler.hitPostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
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
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
