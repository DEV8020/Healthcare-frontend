const getDoctorMenuOptionsNameKeys = () => {
  return {
    newEncounterKey: "NewEncounter",
    patientUpdateKey: "CreateAppointment",
  };
};

const getDoctorMenuOptionsLabelKeys = () => {
  return {
    newEncounterKey: "New Encounter",
    patientUpdateKey: "Patient Updates",
  };
};

const DoctorUtilitiesKeys = {
  getDoctorMenuOptionsNameKeys,
  getDoctorMenuOptionsLabelKeys,
};

export default DoctorUtilitiesKeys;
