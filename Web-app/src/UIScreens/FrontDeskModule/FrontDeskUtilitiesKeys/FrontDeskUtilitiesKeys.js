//########################## Front Desk Menu Keys  ##########################

//Super Admin Menu Create Options Keys...
const getPatientRegistrationDataKeys = () => {
  return {
    nameKey: "name",
    dateOfBirthKey: "dob",
    contactKey: "contact",
    patientGenderKey: "sex",
    addressKey: "address",
    pinCodeKey: "pincode",
  };
};

const getPatientRegistrationLabelKeys = () => {
    return {
      nameKey: "Patient's Name",
      dateOfBirthKey: "Patient's DOB",
      contactKey: "Patient's Contact No.",
      patientGenderKey: "Patient's Sex",
      addressKey: "Patient's Address",
      pinCodeKey: "Patient's Pincode",
    };
  };

//Patient Registration Initial Data...
const getPatientRegistrationInitialData = () => {
  return {
    [getPatientRegistrationDataKeys().nameKey]: "",
    [getPatientRegistrationDataKeys().dateOfBirthKey]: "",
    [getPatientRegistrationDataKeys().contactKey]: "",
    [getPatientRegistrationDataKeys().patientGenderKey]: "",
    [getPatientRegistrationDataKeys().addressKey]: "",
    [getPatientRegistrationDataKeys().pinCodeKey]: "",
  };
};

const SuperAdminUtilitiesKeys = {
  getPatientRegistrationDataKeys,
  getPatientRegistrationInitialData,
  getPatientRegistrationLabelKeys
};

export default SuperAdminUtilitiesKeys;
