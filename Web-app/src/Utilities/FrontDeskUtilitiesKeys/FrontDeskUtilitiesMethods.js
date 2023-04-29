import UtilitiesKeys from "../UtilitiesKeys";
import UtilitiesMethods from "../UtilitiesMethods";
import FrontDeskUtilitiesKeys from "./FrontDeskUtilitiesKeys";

const processPatientDetailDataToDisplay = (prop) => {
  return {
    Name: prop.name,
    Age: prop.age,
    Sex: prop.sex,
    // Contact: prop.contact,
  };
};

const processSearchPatientDataToDisplay = (prop) => {
  return {
    "Patient ID": prop.patientId,
    Name: prop.name,
    Age: prop.age,
    Sex: prop.sex,
    // Contact: prop.contact,
    // Address : prop.address,
    // Pincode : prop.pincode
  };
};

// UtilitiesKeys
// UtilitiesMethods

const checkPatientRegistrationValidationData = (patientRegistrationData) => {
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  //####################### Patient's Name Validation #######################
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      patientRegistrationData[
        FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().nameKey
      ]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid name. It can't be Left blank.",
      },
    };
  }

  //####################### Patient's Contact Number Validation #######################
  //Validation for user contact number...
  const userContactNumber =
    patientRegistrationData[
      FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().contactKey
    ];
  const userContactNumberRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
  );
  //Show Alert Message in case of Invalid Contact Number...
  if (userContactNumber.length !== userContactNumberRequiredLength) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
      },
    };
  }

  //####################### Patient's Address Validation #######################
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      patientRegistrationData[
        FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().addressKey
      ]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid address. It can't be Left blank.",
      },
    };
  }

  //####################### Patient's Pin Code Validation #######################
  //Validation for user Pin Code...
  const userPinCodeMappedKey =
    FrontDeskUtilitiesKeys.getPatientRegistrationDataKeys().pinCodeKey;
  const userPinCodeRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
  );

  //Show Alert Message in case of Invalid PIN CODE...
  if (
    patientRegistrationData[userPinCodeMappedKey].length !==
    userPinCodeRequiredLength
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .pinCodeNotValidMessage,
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

const FrontDeskUtilitiesMethods = {
  processPatientDetailDataToDisplay,
  processSearchPatientDataToDisplay,
  checkPatientRegistrationValidationData,
};

export default FrontDeskUtilitiesMethods;
