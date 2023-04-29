import UtilitiesKeys from "../UtilitiesKeys";
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
    patientUpdateKey: "FollowUp Updates",
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

const checkPrescriptionDataValidation = (prescriptionData, isConsentClicked) => {
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };


 //####################### Patient's Symptoms Data Validation #######################
 if (
  UtilitiesMethods.getSpaceTrimmedLenght(prescriptionData.additionalNotes) === 0
) {
  return {
    ...validationData,
    ...{
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Please enter symptoms. It can't be Left blank.",
    },
  };
}


  //####################### Patient's precription Data Validation #######################
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(prescriptionData.prescription) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter prescription. It can't be Left blank.",
      },
    };
  }


  //####################### Patient's consent checkbox Data Validation #######################
  if (isConsentClicked === false) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please check the button to share your health records.",
      },
    };
  }

  return {
    ...validationData,
    ...{
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    },
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
  checkPrescriptionDataValidation,
};

export default DoctorUtilitiesKeys;
