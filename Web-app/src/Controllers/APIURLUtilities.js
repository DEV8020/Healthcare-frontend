//########################## API Child URL's Keys  ##########################

//API Child URL Keys...
const getAPIChildURLKeys = () => {
  return {
    loginAPIKey: "login/",
    superAdminGetAllUsersAPIKey: "superadmin/getAllUsers",
    // superAdminGetAllUsersAPIKey: "superadmin/getAllUsers",
  };
};

//Super Admin Menu Options API Child URL Keys...
const getSuperAdminAPIChildURLKeys = () => {
  return {
    superAdminAddHospitalAPIKey: "superadmin/addHospital",
    superAdminGetAddSupervisorAPIKey: "superadmin/addSupervisor",
  };
};

const APIURLUtilities = {
  getAPIChildURLKeys,
  getSuperAdminAPIChildURLKeys,
};

export default APIURLUtilities;
