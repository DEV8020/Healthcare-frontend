//########################## Supervisor Menu Keys  ##########################

import UtilitiesKeys from "../UtilitiesKeys";
import UtilitiesMethods from "../UtilitiesMethods";

//Supervisor Register Field Worker Data Keys...
const getFieldWorkerRegistrationDataKeys = () => {
  return {
    nameKey: "name",
    userIDKey: "username",
    contactKey: "contact",
    passwordKey: "password",
    addressKey: "address",
    pinCodeKey: "pincode",
  };
};

//Supervisor Register Field Worker Label Keys...
const getFieldWorkerRegistrationLabelKeys = () => {
  return {
    nameKey: "Name",
    userIDKey: "Username",
    contactKey: "Contact No.",
    passwordKey: "Password",
    addressKey: "Address",
    pinCodeKey: "Pincode",
  };
};

const getSupervisorMenuOptionsNameKeys = () => {
  return {
    assignFollowUpKey: "NewFollowUpAssign",
    fieldWorkerListKey: "FieldWorkerList",
    fieldWorkerRegistrationKey: "FieldWorkerRegistration",
  };
};

const getSupervisorMenuOptionsLabelKeys = () => {
  return {
    assignFollowUpKey: "Assign Follow ups",
    fieldWorkerListKey: "Field Worker List",
    fieldWorkerRegistrationKey: "Field Worker Registration",
  };
};

const checkFieldWorkerValidationData = (
  selectedDataFromFieldWorkerRegistration,
  isUpdateScreen
) => {
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };


   if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      selectedDataFromFieldWorkerRegistration[getFieldWorkerRegistrationDataKeys().userIDKey]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid user name. It can't be Left blank.",
      },
    };
  }


  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      selectedDataFromFieldWorkerRegistration[getFieldWorkerRegistrationDataKeys().nameKey]
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


  if (isUpdateScreen === false &&
    UtilitiesMethods.getSpaceTrimmedLenght(
      selectedDataFromFieldWorkerRegistration[getFieldWorkerRegistrationDataKeys().passwordKey]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid password. It can't be Left blank.",
      },
    };
  }





  //Validation for user contact number...
  const userContactNumber =
    selectedDataFromFieldWorkerRegistration[
      SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().contactKey
    ];
  const userContactNumberRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
  );

  // UtilitiesKeys

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
// UtilitiesMethods

  
  if (isUpdateScreen === false &&
    UtilitiesMethods.getSpaceTrimmedLenght(
      selectedDataFromFieldWorkerRegistration[getFieldWorkerRegistrationDataKeys().addressKey]
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

  //Validation for user Pin Code...
  const userAddressPinCode =
    selectedDataFromFieldWorkerRegistration[
      SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().pinCodeKey
    ];
  const userPinCodeRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
  );
  //Show Alert Message in case of Invalid PIN CODE...
  if (isUpdateScreen === false && userAddressPinCode.length !== userPinCodeRequiredLength) {
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

// const checkFieldWorkerValidationData = (
//   selectedDataFromFieldWorkerRegistration,
//   isUpdateScreen
// ) => {
//   //Validation for user contact number...
//   const userContactNumber =
//     selectedDataFromFieldWorkerRegistration[
//       SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().contactKey
//     ];
//   const userContactNumberRequiredLength = parseInt(
//     UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
//   );

//   //Show Alert Message in case of Invalid Contact Number...
//   if (userContactNumber.length !== userContactNumberRequiredLength) {
//     showMessageAtBottomBar({
//       message:
//         UtilitiesKeys.getGeneralValidationMessagesText()
//           .phoneNumberNotValidMessage,
//       isErrorMessage: false,
//     });
//     return;
//   }

//   //Validation for user Pin Code...
//   const userAddressPinCode =
//     selectedDataFromFieldWorkerRegistration[
//       SupervisorUtilitiesKeys.getFieldWorkerRegistrationDataKeys().pinCodeKey
//     ];
//   const userPinCodeRequiredLength = parseInt(
//     UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
//   );
//   //Show Alert Message in case of Invalid PIN CODE...
//   if (userAddressPinCode.length !== userPinCodeRequiredLength) {
//     showMessageAtBottomBar({
//       message:
//         UtilitiesKeys.getGeneralValidationMessagesText().pinCodeNotValidMessage,
//       isErrorMessage: false,
//     });
//     return;
//   }
// };

//Field Worker Registration Initial Data...
const getFieldWorkerRegistrationInitialData = () => {
  return {
    [getFieldWorkerRegistrationDataKeys().nameKey]: "",
    [getFieldWorkerRegistrationDataKeys().userIDKey]: "",
    [getFieldWorkerRegistrationDataKeys().passwordKey]: "",
    [getFieldWorkerRegistrationDataKeys().contactKey]: "",
    [getFieldWorkerRegistrationDataKeys().addressKey]: "",
    [getFieldWorkerRegistrationDataKeys().pinCodeKey]: "",
  };
};

const SupervisorUtilitiesKeys = {
  getFieldWorkerRegistrationDataKeys,
  getFieldWorkerRegistrationLabelKeys,
  getFieldWorkerRegistrationInitialData,
  getSupervisorMenuOptionsNameKeys,
  getSupervisorMenuOptionsLabelKeys,
  checkFieldWorkerValidationData,
};

export default SupervisorUtilitiesKeys;
