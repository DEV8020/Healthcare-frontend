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
    nameKey: "Field Worker's Name",
    userIDKey: "Field Worker's UserID",
    contactKey: "Field Worker's Contact No.",
    passwordKey: "Field Worker's Password",
    addressKey: "Field Worker's Address",
    pinCodeKey: "Field Worker's Pincode",
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
};

export default SupervisorUtilitiesKeys;
