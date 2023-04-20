//########################## Supervisor Menu Keys  ##########################

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
    fieldWorkerRegistrationKey : "FieldWorkerRegistration",
  };
};


const getSupervisorMenuOptionsLabelKeys = () => {
  return {
    assignFollowUpKey: "Assign Follow ups",
    fieldWorkerListKey: "Field Worker List",
    fieldWorkerRegistrationKey : "Field Worker Registration",
  };
};

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
  getSupervisorMenuOptionsLabelKeys
};

export default SupervisorUtilitiesKeys;
