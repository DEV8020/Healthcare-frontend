//########################## Admin Menu Keys  ##########################

import UtilitiesKeys from "../UtilitiesKeys";
import UtilitiesMethods from "../UtilitiesMethods";

//Admin Menu Create User Options Keys...
const getCreateUserDataKeys = () => {
  return {
    userIDKey: "username",
    userNameKey: "name",
    userPasswordKey: "password",
    userContactKey: "contact",
    userPasswordKey: "password",
    doctorLicenseIDKey: "licId",
    doctorSpecializationKey: "docSpecialization",
    userTypeKey: "role",
   
  };
};

//Admin Menu Create Doctor Label Keys...
const getCreateUserLabelKeys = () => {
  return {
    doctorNameKey: "Name",
    doctorLicenseIDKey: "License ID",
    doctorContactKey: "Contact Number",
    doctorSpecializationKey: "Specialization",
    doctorUserIDKey: "Username",
    doctorPasswordKey: "Password",
  };
};

//Admin Menu Create User Label Keys...
const getCreateFrontDeskLabelKeys = () => {
  return {
    frontDeskUserIDKey: "Username",
    frontDeskUserNameKey: "Name",
    frontDeskPasswordKey: "Password",
    frontDeskUserTypeKey: "User Type",
  };
};

//Admin Menu Create User Options Keys...
const getCreateFrontDeskInitialData = () => {
  return {
    [getCreateUserDataKeys().userIDKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userNameKey]: "",
  };
};

//Admin Menu Create User Options Keys...
const getCreateUserInitialData = () => {
  return {
    [getCreateUserDataKeys().userIDKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userNameKey]: "",
    [getCreateUserDataKeys().doctorLicenseIDKey]: "",
    [getCreateUserDataKeys().userContactKey]: "",
    [getCreateUserDataKeys().doctorSpecializationKey]: "",
  };
};

const getAdminMenuOptionsNameKeys = () => {
  return {
    showHospitalsUsersKey: "showHospitalUsers",
    createDoctorKey: "addDoctor",
    createFrontDeskKey: "addFrontDesk",
  };
};

const getAdminMenuOptionsLabelKeys = () => {
  return {
    showHospitalsUsersKey: "Show Hospital Users",
    createDoctorKey: "Doctor Registration",
    createFrontDeskKey: "Front Desk Registration",
  };
};

const checkAddUserDataValidations = (userData, isUpdateScreen) => {
 
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userData[getCreateUserDataKeys().userIDKey]
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

  if (isUpdateScreen === false &&
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

  return {
    ...validationData,
    ...{
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    },
  };
};





const checkAddDoctorDataValidations = (userData) => {
 
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().warningKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  if (
    UtilitiesMethods.getSpaceTrimmedLenght(
      userData[getCreateUserDataKeys().userIDKey]
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


    //Validation for user contact number...
    const userContactNumberMappedKey =
    AdminUtilities.getCreateUserDataKeys().userContactKey;
    const userContactNumber = userData[userContactNumberMappedKey];
    const userContactNumberRequiredLength = parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    );

    //Show Alert Message in case of Invalid Contact Number...
    if (
      userContactNumber.length !== userContactNumberRequiredLength
    ) {
      return {
        ...validationData,
        ...{
          [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText().phoneNumberNotValidMessage,
        },
      };
    }

  
    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        userData[getCreateUserDataKeys().doctorLicenseIDKey]
      ) === 0
    ) {
      return {
        ...validationData,
        ...{
          [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
            "Please enter valid license id. It can't be Left blank.",
        },
      };
    }


    if (
      UtilitiesMethods.getSpaceTrimmedLenght(
        userData[getCreateUserDataKeys().doctorSpecializationKey]
      ) === 0
    ) {
      return {
        ...validationData,
        ...{
          [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
            "Please enter valid specialisation. It can't be Left blank.",
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









const AdminUtilities = {
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getCreateUserLabelKeys,
  getCreateFrontDeskInitialData,
  getCreateFrontDeskLabelKeys,
  getAdminMenuOptionsNameKeys,
  getAdminMenuOptionsLabelKeys,
  checkAddUserDataValidations,
  checkAddDoctorDataValidations
};

export default AdminUtilities;
