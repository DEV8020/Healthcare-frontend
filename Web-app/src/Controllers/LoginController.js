import GlobalServiceHandler from "./GlobalServiceHandler";

const GetUserLoginData = async (props) => {
    console.log(props.userData);
  await GlobalServiceHandler.hitPostService({
    childURL: "login",
    postData: props.userData,
    responseDataHandler: (loginServiceData) => {
      if (loginServiceData.responseError === null) {
        props.userLoginResponseHandler({
          userLoginData : loginServiceData.responseData.data,
          isLoginFlag: true,
          errorMessage: null,
        });
      } else if (loginServiceData.responseData === null) {
        props.userLoginResponseHandler({
          userLoginData : null,
          isLoginFlag: false,
          errorMessage: loginServiceData.responseError.message,
        });
      }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
