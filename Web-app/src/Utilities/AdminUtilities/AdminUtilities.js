//########################## Admin Menu Keys  ##########################

//Admin Menu Create User Options Keys...
const getCreateUserDataKeys = () => {
  return {
    userIDKey: "username",
    userNameKey: "name",
    userPasswordKey: "password",
    userContactKey: "contact",
    userPasswordKey: "password",
    doctorLicenseIDKey: "licId",
    doctorSpecializationKey: "docSpecialization",
  };
};

//Admin Menu Create User Label Keys...
const getCreateUserLabelKeys = () => {
  return {
    doctorNameKey: "Doctor Name",
    doctorLicenseIDKey: "Doctor license ID",
    doctorContactKey: "Contact Number",
    doctorSpecializationKey: "Doctor Specialization",
    doctorUserIDKey: "User Id",
    doctorPasswordKey: "Password",
    //   doctorSpecializationKey: "docSpecialization",
  };
};

//Admin Menu Create User Label Keys...
const getCreateFrontDeskLabelKeys = () => {
  return {
    frontDeskUserIDKey: "FrontDesk User Id",
    frontDeskUserNameKey: "FrontDesk Name",
    frontDeskPasswordKey: "Password",
  };
};

//Admin Menu Create User Options Keys...
const getCreateFrontDeskInitialData = () => {
  return {
    [getCreateUserDataKeys().userIDKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userNameKey]: "",
  };
};

//Admin Menu Create User Options Keys...
const getCreateUserInitialData = () => {
  return {
    [getCreateUserDataKeys().userIDKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userNameKey]: "",
    [getCreateUserDataKeys().doctorLicenseIDKey]: "",
    [getCreateUserDataKeys().userContactKey]: "",
    [getCreateUserDataKeys().doctorSpecializationKey]: "",
  };
};


const AdminUtilities = {
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getCreateUserLabelKeys,
  getCreateFrontDeskInitialData,
  getCreateFrontDeskLabelKeys,
};

export default AdminUtilities;
