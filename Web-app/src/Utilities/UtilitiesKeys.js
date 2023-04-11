//########################## Register Hospital In Super Admin Menu Keys  ##########################

//Hopspital Registration Data Keys...
const getHospitalRegistrationDataKeys = () => {
  return { nameKey: "name", addressKey: "address" };
};

//Hopspital Registration Form Input Field Label Keys...
const getHospitalRegistrationFormLabelKeys = () => {
  return { nameKey: "Hospital Name", addressKey: "Hospital Address" };
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
    hospitalIDKey: "hospitalId",
  };
};

//Create User Form Input Field Label Keys...
const getCreateUserFormLabelKeys = () => {
  return {
    userIdLabel: "User ID",
    userNameLabel: "User Name",
    userPasswordLabel: "Password",
    userPasswordLabel: "Password",
    hospitalIDLabel: "Hospital ID",
  };
};

//{name: 'sadad', userId: '', password: '', userType: 'Admin', hospitalId: '', …}

const UtilitiesKeys = {
  getHospitalRegistrationDataKeys,
  getHospitalRegistrationFormLabelKeys,
  getHospitalRegistrationMessagesText,
  getCreateUserDataKeys,
  getCreateUserFormLabelKeys,
};

export default UtilitiesKeys;
