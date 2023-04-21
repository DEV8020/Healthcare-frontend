import UtilitiesMethods from "../UtilitiesMethods";

const getDoctorMenuOptionsNameKeys = () => {
  return {
    newEncounterKey: "NewEncounter",
    patientUpdateKey: "CreateAppointment",

    viewHistoryKey: "ViewHistory",
    createPrescriptionKey: "Prescription",
    pendingEncounterKey: "PendingAppointment",
  };
};

const getDoctorMenuOptionsLabelKeys = () => {
  return {
    newEncounterKey: "New Appointment",
    patientUpdateKey: "Patient Updates",
    viewHistoryKey: "View History",
    createPrescriptionKey: "Prescription",
    pendingEncounterKey: "Pending Appointment",
  };
};

const getDoctorAddFollowUpLabelKeys = () => {
  return {
    doctorRemarksKey: "doctorRemarks",
    followUpDateKey: "date",
    followReadingsKey: "readings",
  };
};

const getDoctorFollowUpInitialData = () => {
  return {
    [getDoctorAddFollowUpLabelKeys().doctorRemarksKey]: "",
    [getDoctorAddFollowUpLabelKeys().followUpDateKey]: "",
    [getDoctorAddFollowUpLabelKeys().followReadingsKey]:
      UtilitiesMethods.getAttributesDataForDoctor(),
  };
};

const DoctorUtilitiesKeys = {
  getDoctorMenuOptionsNameKeys,
  getDoctorMenuOptionsLabelKeys,
  getDoctorFollowUpInitialData,
  getDoctorAddFollowUpLabelKeys,
};

export default DoctorUtilitiesKeys;
