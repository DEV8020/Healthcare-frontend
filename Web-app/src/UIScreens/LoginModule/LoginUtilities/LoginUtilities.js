//########################## Login Menu Option Keys  ##########################

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
};

export default LoginUtilities;
