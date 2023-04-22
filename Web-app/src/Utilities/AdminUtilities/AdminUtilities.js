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
    userTypeKey: "role",
  };
};

//Admin Menu Create Doctor Label Keys...
const getCreateUserLabelKeys = () => {
  return {
    doctorNameKey: "Name",
    doctorLicenseIDKey: "License ID",
    doctorContactKey: "Contact Number",
    doctorSpecializationKey: "Specialization",
    doctorUserIDKey: "Username",
    doctorPasswordKey: "Password",
  };
};

//Admin Menu Create User Label Keys...
const getCreateFrontDeskLabelKeys = () => {
  return {
    frontDeskUserIDKey: "Username",
    frontDeskUserNameKey: "Name",
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


const getAdminMenuOptionsNameKeys = () => {
    return {
      showHospitalsUsersKey: "showHospitalUsers",
      createDoctorKey: "addDoctor",
      createFrontDeskKey: "addFrontDesk",
    };
  };
  
  const getAdminMenuOptionsLabelKeys = () => {
    return {
      showHospitalsUsersKey: "Show Hospital Users",
      createDoctorKey: "Doctor Registration",
      createFrontDeskKey: "Front Desk Registration",
    };
  };


const AdminUtilities = {
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getCreateUserLabelKeys,
  getCreateFrontDeskInitialData,
  getCreateFrontDeskLabelKeys,
  getAdminMenuOptionsNameKeys,
  getAdminMenuOptionsLabelKeys,
};

export default AdminUtilities;
