//########################## Login Menu Option Keys  ##########################

import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

//Login Module Data Keys...
const getLoginDataKeys = () => {
  return {
    userNameKey: "username",
    userPasswordKey: "password",
    userRoleKey: "role",
  };
};

//Login Module Label Keys...
const getLoginLabelKeys = () => {
  return {
    userNameKey: "Username",
    userPasswordKey: "Password",
    userRoleKey: "",
  };
};

//Field Worker Registration Initial Data...
const getLoginInitialData = () => {
  return {
    [getLoginDataKeys().userNameKey]: "",
    [getLoginDataKeys().userPasswordKey]: "",
    [getLoginDataKeys().userRoleKey]: getLoginUserTypeKeys().superAdminTypeKey,
  };
};

const getLoginModuleValidationMessagesText = () => {
  return {
    userTypeNotSelected: "Please select valid user role to proceed.",
    forgotPasswordDBAdminMessage:
      "Please contact database administrator to recover your password.",
    forgotPasswordSuperAdminMessage:
      "Please contact super admin to recover your password.",
    forgotPasswordAdminMessage:
      "Please contact admin to recover your password.",
  };
};

const getLoginUserTypeKeys = () => {
  return {
    superAdminTypeKey: "Super Admin",
    adminTypeKey: "Admin",
    supervisorTypeKey: "Supervisor",
    doctorTypeKey: "Doctor",
    frontDeskTypeKey: "Front Desk",
  };
};

const checkUserLoginValidations = (userLoginData) => {

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userLoginData[getLoginDataKeys().userNameKey]
    ) === 0
  ) {
    return {
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Please enter valid username. It can't be Left blank.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    };
  }

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userLoginData[getLoginDataKeys().userPasswordKey]
    ) === 0
  ) {
    return {
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Please enter valid password. It can't be Left blank.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    };
  }

  return {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
  };
};

const getLoggedInUserRoleTypeForServer = (userType) => {
  console.log("getLoggedInUserRoleTypeForServer");
  console.log(userType);

  if (userType === getLoginUserTypeKeys().superAdminTypeKey) {
    return "ROLE_SUPER_ADMIN";
  } else if (userType === getLoginUserTypeKeys().adminTypeKey) {
    return "ROLE_ADMIN";
  } else if (userType === getLoginUserTypeKeys().supervisorTypeKey) {
    return "ROLE_SUPERVISOR";
  } else if (userType === getLoginUserTypeKeys().doctorTypeKey) {
    return "ROLE_DOCTOR";
  }
  return "ROLE_FRONT_DESK";
};

const LoginUtilities = {
  getLoginDataKeys,
  getLoginLabelKeys,
  getLoginInitialData,
  getLoginModuleValidationMessagesText,
  getLoggedInUserRoleTypeForServer,
  getLoginUserTypeKeys,
  checkUserLoginValidations,
};

export default LoginUtilities;
