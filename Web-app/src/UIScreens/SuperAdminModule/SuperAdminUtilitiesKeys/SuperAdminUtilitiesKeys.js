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
  getCreateUserInitialData
};

export default SuperAdminUtilitiesKeys;
