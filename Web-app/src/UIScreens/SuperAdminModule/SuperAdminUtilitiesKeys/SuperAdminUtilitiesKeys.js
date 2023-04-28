//########################## Super Admin Menu Keys  ##########################

import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";
import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";

//Super Admin Menu Create Options Keys...
const getCreateUserOptionKeys = () => {
  return {
    createUserAdminOption: "Admin",
    createUserSupervisorOption: "Supervisor",
  };
};

const getSuperAdminErrorMessagesText = () => {
  return {
    chooseHospilatIDFromList: "Please choose hospital id from the list.",
  };
};

const getSuperAdminMenuOptionsNameKeys = () => {
  return {
    hospitalRegistrationKey: "HospitalRegistration",
    createNewUserKey: "CreateUserScreen",
    registeredUsersListKey: "AllUsers",
  };
};

const getSuperAdminMenuOptionsLabelKeys = () => {
  return {
    hospitalRegistrationKey: "Hospital Registration",
    createNewUserKey: "Create New User",
    registeredUsersListKey: "All registered Users",
  };
};

//Hopspital Registration Form Input Field Label Keys...
const getHospitalRegistrationFormLabelKeys = () => {
  return {
    nameKey: "Name",
    addressKey: "Address",
    pinCodeKey: "Pincode",
  };
};

const checkRegisterUserDataValidations = (userData, registerUserType) => {
  //Validation for user contact number...
  const userContactNumberMappedKey =
    UtilitiesKeys.getCreateUserDataKeys().userContactKey;
  const userContactNumber = userData[userContactNumberMappedKey];
  const userContactNumberRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
  );

  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  console.log(userData);
  console.log(registerUserType);

  //Show Alert Message in case of Invalid Contact Number...
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userData[getCreateUserDataKeys().userIdKey]
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
      userData[getCreateUserDataKeys().userNameKey]
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

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userData[getCreateUserDataKeys().userPasswordKey]
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

  //Show Alert Message in case of Invalid Contact Number...
  if (
    registerUserType ===
      SuperAdminUtilitiesKeys.getCreateUserOptionKeys()
        .createUserSupervisorOption &&
    userContactNumber.length !== userContactNumberRequiredLength
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
      },
    };
  }

  if (
    registerUserType ===
      SuperAdminUtilitiesKeys.getCreateUserOptionKeys()
        .createUserSupervisorOption &&
    UtilitiesMethods.getSpaceTrimmedLenght(
      userData[getCreateUserDataKeys().userAddressKey]
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
    userData[UtilitiesKeys.getCreateUserDataKeys().userAddressPinCodeKey];
  const userPinCodeRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
  );
  //Show Alert Message in case of Invalid PIN CODE...
  if (
    registerUserType ===
      SuperAdminUtilitiesKeys.getCreateUserOptionKeys()
        .createUserSupervisorOption &&
    userAddressPinCode.length !== userPinCodeRequiredLength
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

const checkAddHospitalDataValidations = (hospitalData) => {
  //Validation for user Pin Code...
  const hospitalAddressPinCode =
    hospitalData[UtilitiesKeys.getHospitalRegistrationDataKeys().pinCodeKey];
  const userPinCodeRequiredLength = parseInt(
    UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
  );

  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      hospitalData[UtilitiesKeys.getHospitalRegistrationDataKeys().nameKey]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid hospital name. It can't be Left blank.",
      },
    };
  }

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      hospitalData[UtilitiesKeys.getHospitalRegistrationDataKeys().addressKey]
    ) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter valid hospital address. It can't be Left blank.",
      },
    };
  }

  //Show Alert Message in case of Invalid PIN CODE...
  if (hospitalAddressPinCode.length !== userPinCodeRequiredLength) {
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

const getUserType = (userType) => {
  if (userType === "ROLE_SUPER_ADMIN") {
    return "Super Admin";
  } else if (userType === "ROLE_ADMIN") {
    return "Admin";
  } else if (userType === "ROLE_SUPERVISOR") {
    return "Supervisor";
  } else if (userType === "ROLE_DOCTOR") {
    return "Doctor";
  } else if (userType === "ROLE_FIELD_WORKER") {
    return "FieldWorker";
  }
  return "Front Desk";
};

//Create User Data Keys...
const getCreateUserDataKeys = () => {
  return {
    userNameKey: "name",
    userIdKey: "username",
    userPasswordKey: "password",
    userTypeKey: "userType",
    userContactKey: "contact",
    userAddressKey: "address",
    hospitalIDKey: "hospitalId",
    userAddressPinCodeKey: "pincode",
    userRoleKey: "role",
  };
};

//User Data Initial data for user creation in Super Admin Menu...
const getCreateUserInitialData = () => {
  return {
    [getCreateUserDataKeys().userNameKey]: "",
    [getCreateUserDataKeys().userIdKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userTypeKey]: "",
    [getCreateUserDataKeys().userContactKey]: "",
    [getCreateUserDataKeys().userAddressKey]: "",
    [getCreateUserDataKeys().hospitalIDKey]: "",
    [getCreateUserDataKeys().userAddressPinCodeKey]: "",
  };
};

//Create User Form Input Field Label Keys...
const getCreateUserFormLabelKeys = () => {
  return {
    userIdLabel: "Username",
    userNameLabel: "Name",
    userPasswordLabel: "Password",
    userContactLabel: "Contact",
    userAddressLabel: "Address",
    userAddressPincodeLabel: "Pincode",
    hospitalIDLabel: "Hospital ID",
    userTypeLabel: "User Type",
  };
};

const SuperAdminUtilitiesKeys = {
  getCreateUserOptionKeys,
  getSuperAdminErrorMessagesText,
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getUserType,
  getSuperAdminMenuOptionsNameKeys,
  getSuperAdminMenuOptionsLabelKeys,
  getHospitalRegistrationFormLabelKeys,
  getCreateUserFormLabelKeys,
  checkAddHospitalDataValidations,
  checkRegisterUserDataValidations,
};

export default SuperAdminUtilitiesKeys;
