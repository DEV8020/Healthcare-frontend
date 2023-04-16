//########################## Super Admin Menu Keys  ##########################

//Super Admin Menu Create Options Keys...
const getCreateUserOptionKeys = () => {
  return {
    createUserAdminOption: "Admin",
    createUserSupervisorOption: "Supervisor",
  };
};

const getSuperAdminErrorMessagesText = () => {
  return {
    chooseHospilatIDFromList: "Please choose hospital id from the list.",
  };
};


const getUserType = (userType) => {
  if (userType === "ROLE_SUPER_ADMIN") {
    return "Super Admin";
  } else if (userType === "ROLE_ADMIN") {
    return "Admin";
  } else if (userType === "ROLE_SUPERVISOR") {
    return "Supervisor";
  } else if (userType === "ROLE_DOCTOR") {
    return "Doctor";
  }
  return "Front Desk";
};



//Create User Data Keys...
const getCreateUserDataKeys = () => {
  return {
    userNameKey: "name",
    userIdKey: "username",
    userPasswordKey: "password",
    userTypeKey: "userType",
    userContactKey: "contact",
    userAddressKey: "address",
    hospitalIDKey: "hospitalId",
    userAddressPinCodeKey: "pincode",
    userRoleKey: "role",
  };
};


//User Data Initial data for user creation in Super Admin Menu...
const getCreateUserInitialData = () => {
  return {
    [getCreateUserDataKeys().userNameKey] : "",
    [getCreateUserDataKeys().userIdKey] : "",
    [getCreateUserDataKeys().userPasswordKey] : "",
    [getCreateUserDataKeys().userTypeKey] : "",
    [getCreateUserDataKeys().userContactKey] : "",
    [getCreateUserDataKeys().userAddressKey] : "",
    [getCreateUserDataKeys().hospitalIDKey] : "",
    [getCreateUserDataKeys().userAddressPinCodeKey] : "",
  };
};

const SuperAdminUtilitiesKeys = {
  getCreateUserOptionKeys,
  getSuperAdminErrorMessagesText,
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getUserType
};

export default SuperAdminUtilitiesKeys;
