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

const getSuperAdminMenuOptionsNameKeys = () => {
  return {
    hospitalRegistrationKey: "HospitalRegistration",
    createNewUserKey: "CreateUserScreen",
    registeredUsersListKey: "AllUsers",
  };
};


const getSuperAdminMenuOptionsLabelKeys = () => {
  return {
    hospitalRegistrationKey: "Hospital Registration",
    createNewUserKey: "Create New User",
    registeredUsersListKey: "All registered Users",
  };
};

//Hopspital Registration Form Input Field Label Keys...
const getHospitalRegistrationFormLabelKeys = () => {
  return {
    nameKey: "Name",
    addressKey: "Address",
    pinCodeKey: "Pincode",
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



//Create User Form Input Field Label Keys...
const getCreateUserFormLabelKeys = () => {
  return {
    userIdLabel: "Username",
    userNameLabel: "Name",
    userPasswordLabel: "Password",
    userContactLabel: "Contact",
    userAddressLabel: "Address",
    userAddressPincodeLabel: "Pincode",
    hospitalIDLabel: "Hospital ID",
  };
};

const SuperAdminUtilitiesKeys = {
  getCreateUserOptionKeys,
  getSuperAdminErrorMessagesText,
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getUserType,
  getSuperAdminMenuOptionsNameKeys,
  getSuperAdminMenuOptionsLabelKeys,
  getHospitalRegistrationFormLabelKeys,
  getCreateUserFormLabelKeys
};

export default SuperAdminUtilitiesKeys;
