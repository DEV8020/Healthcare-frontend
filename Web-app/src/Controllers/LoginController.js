import LoginUtilities from "../UIScreens/LoginModule/LoginUtilities/LoginUtilities";
import APIURLUtilities from "./APIURLUtilities";
import GlobalServiceHandler from "./GlobalServiceHandler";

const GetUserLoginData = async (props) => {

  //Extracting User Type Value...
  const userType =
    props.userData[LoginUtilities.getLoginDataKeys().userRoleKey];

  //Extracting User Type Value and replace with Value modified as per server need...
  const userUpdatedData = {
    ...props.userData,
    ...{
      [LoginUtilities.getLoginDataKeys().userRoleKey]:
        LoginUtilities.getLoggedInUserRoleTypeForServer(userType),
    },
  };

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: APIURLUtilities.getAPIChildURLKeys().loginAPIKey,
    postData: userUpdatedData,
    responseDataHandler: (loginServiceData) => {
      //Login respone parsing in case of Success...
      if (loginServiceData.responseError === null) {
        props.userLoginResponseHandler({
          isLoginFlag: true,
          loggedInUserData: loginServiceData.responseData.data,
          errorMessage: null,
        });
      } 
      //Login respone parsing in case of Error...
      else if (loginServiceData.responseData === null) {
        props.userLoginResponseHandler({
          isLoginFlag: false,
          loggedInUserData: null,
          errorMessage: loginServiceData.responseError.message,
        });
      }
    },
  });
};

const LoginController = { GetUserLoginData };
export default LoginController;
