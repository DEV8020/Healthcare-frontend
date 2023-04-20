const getDoctorMenuOptionsNameKeys = () => {
  return {
    newEncounterKey: "NewEncounter",
    patientUpdateKey: "CreateAppointment",

    viewHistoryKey : "ViewHistory",
    createPrescriptionKey : "Prescription"
  };
};


const getDoctorMenuOptionsLabelKeys = () => {
  return {
    newEncounterKey: "New Appointment",
    patientUpdateKey: "Patient Updates",

    viewHistoryKey : "View History",
    createPrescriptionKey : "Prescription"
  };
};

const DoctorUtilitiesKeys = {
  getDoctorMenuOptionsNameKeys,
  getDoctorMenuOptionsLabelKeys,
};

export default DoctorUtilitiesKeys;
