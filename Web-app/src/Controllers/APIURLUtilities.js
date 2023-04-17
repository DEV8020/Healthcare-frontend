//########################## API Child URL's Keys  ##########################

//API Child URL Keys...
const getAPIChildURLKeys = () => {
  return {
    loginAPIKey: "login/",
    superAdminGetAllUsersAPIKey: "superadmin/getAllUsers",
  };
};

//Super Admin Menu Options API Child URL Keys...
const getSuperAdminAPIChildURLKeys = () => {
  return {
    superAdminAddHospitalAPIKey: "superadmin/addHospital",
    superAdminAddAdminAPIKey: "superadmin/addAdmin/",
    superAdminAddSupervisorAPIKey: "superadmin/addSupervisor",
    superAdminFetchHospitalsAPIKey: "superadmin/hospitalsWithNoAdmins",
    superAdminUpdateAdminAPIKey : "superadmin/updateAdmin",
    superAdminUpdateSuperVisorAPIKey : "superadmin/updateSupervisor"
  };
};



//Admin Menu Options API Child URL Keys...
const getAdminAPIChildURLKeys = () => {
  return {
    adminAddDoctorAPIKey: "admin/addDoctor/",
    adminAddFrontDeskAPIKey: "admin/addFrontDesk/",
    adminGetAllUsersAPIKey: "admin/getAllHospitalUsers/",
    adminUpdateDoctorAPIKey: "admin/updateDoctor",
    adminUpdateFrontDeskAPIKey: "admin/updateFrontDesk",

  };
};

//Front Desk Menu Options API Child URL Keys...
const getFrontDeskAPIChildURLKeys = () => {
  return {
    frontDeskPatientRegistrationAPIKey: "frontdesk/addPatients",
    frontDeskGetPatientsDetailAPIKey: "frontdesk/getPatientById/",
    frontDeskAddPatientEncounterAPIKey: "frontdesk/addPendingQueue/",
  };
};


const APIURLUtilities = {
  getAPIChildURLKeys,
  getSuperAdminAPIChildURLKeys,
  getAdminAPIChildURLKeys,
  getFrontDeskAPIChildURLKeys
};

export default APIURLUtilities;
