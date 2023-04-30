//########################## Front Desk Menu Keys  ##########################


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
      nameKey: "Name",
      dateOfBirthKey: "DOB",
      contactKey: "Contact No.",
      patientGenderKey: "Sex",
      addressKey: "Address",
      pinCodeKey: "Pincode",
    };
  };

//Patient Registration Initial Data...
const getPatientRegistrationInitialData = () => {
  return {
    [getPatientRegistrationDataKeys().nameKey]: "",
    [getPatientRegistrationDataKeys().dateOfBirthKey]: "",
    [getPatientRegistrationDataKeys().contactKey]: "",
    [getPatientRegistrationDataKeys().patientGenderKey]: "Male",
    [getPatientRegistrationDataKeys().addressKey]: "",
    [getPatientRegistrationDataKeys().pinCodeKey]: "",
  };
};


const getFrontDeskMenuOptionsNameKeys = () => {
  return {
    patientRegistrationKey: "PatientRegistration",
    createAppointmentKey: "CreateAppointment",
  };
};

const getFrontDeskMenuOptionsLabelKeys = () => {
  return {
    patientRegistrationKey: "Patient Registration",
    createAppointmentKey: "Create Appointment",
  };
};


const FrontDeskUtilitiesKeys = {
  getPatientRegistrationDataKeys,
  getPatientRegistrationInitialData,
  getPatientRegistrationLabelKeys,
  getFrontDeskMenuOptionsNameKeys,
  getFrontDeskMenuOptionsLabelKeys
};

export default FrontDeskUtilitiesKeys;
