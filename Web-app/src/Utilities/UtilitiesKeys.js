//########################## Register Hospital In Super Admin Menu Keys  ##########################

//Hopspital Registration Data Keys...
const getHospitalRegistrationDataKeys = () => {
  return { nameKey: "name", addressKey: "address", pinCodeKey: "pincode" };
};

//Hopspital Registration Form Input Field Label Keys...
const getHospitalRegistrationFormLabelKeys = () => {
  return {
    nameKey: "Hospital Name",
    addressKey: "Hospital Address",
    pinCodeKey: "Hospital Pincode",
  };
};

//Hopspital Registration Messages Keys...
const getHospitalRegistrationMessagesText = () => {
  return { successMessage: "Hospital Added Successfully." };
};

//########################## Create User In Super Admin Menu Keys  ##########################

//Create User Data Keys...
const getCreateUserDataKeys = () => {
  return {
    userNameKey: "name",
    userIdKey: "userId",
    userPasswordKey: "password",
    userTypeKey: "userType",
    userContactKey: "contact",
    userAddressKey: "address",
    hospitalIDKey: "hospitalId",
    userAddressPinCodeKey: "pincode",
  };
};

//########################## Create User In Super Admin Menu Keys  ##########################

//Create User Form Input Field Label Keys...
const getCreateUserFormLabelKeys = () => {
  return {
    userIdLabel: "User ID",
    userNameLabel: "User Name",
    userPasswordLabel: "Password",
    userContactLabel: "Contact",
    userAddressLabel: "Address",
    userAddressPincodeLabel: "Pincode",
    hospitalIDLabel: "Hospital ID",
  };
};

//########################## Input Field Length Validation Keys  ##########################

//Input Field Lenght Validation Keys...
const getInputFieldLengthValidationKeys = () => {
  return {
    userPinCodeLength: "6",
    userContactNumberLength: "10",
  };
};

const getGeneralValidationMessagesText = () => {
  return {
    pinCodeNotValidMessage: "Please enter valid Pin Code. It must of 6 digits.",
    phoneNumberNotValidMessage:
      "Please enter valid contact number. It must of 10 digits.",
  };
};

const UtilitiesKeys = {
  getHospitalRegistrationDataKeys,
  getHospitalRegistrationFormLabelKeys,
  getHospitalRegistrationMessagesText,
  getCreateUserDataKeys,
  getCreateUserFormLabelKeys,
  getInputFieldLengthValidationKeys,
  getGeneralValidationMessagesText,
};

export default UtilitiesKeys;
