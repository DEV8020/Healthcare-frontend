const getHospitalRegistrationDataKeys = () => {
  return { nameKey: "name", addressKey: "address" };
};

const getHospitalRegistrationFormLabelKeys = () => {
  return { nameKey: "Hospital Name", addressKey: "Hospital Address" };
};


const getHospitalRegistrationMessagesText = () => {
    return { successMessage : "Hospital Added Successfully."};
};


const UtilitiesKeys = {
  getHospitalRegistrationDataKeys,
  getHospitalRegistrationFormLabelKeys,
  getHospitalRegistrationMessagesText
};

export default UtilitiesKeys;
