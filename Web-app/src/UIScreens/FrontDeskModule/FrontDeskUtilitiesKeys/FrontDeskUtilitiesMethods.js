

const processPatientDetailDataToDisplay = (prop) => {
    return {
      Name: prop.name,
      Age: prop.age,
      Sex: prop.sex,
      Contact: prop.contact,
    };
  };

const processSearchPatientDataToDisplay = (prop) => {
  return {
    "Patient ID": prop.patientId,
    Name: prop.name,
    Age: prop.age,
    Sex: prop.sex,
    Contact: prop.contact,
    Address : prop.address,
    Pincode : prop.pincode
  };
};

const FrontDeskUtilitiesMethods = {
  processPatientDetailDataToDisplay,
  processSearchPatientDataToDisplay
};

export default FrontDeskUtilitiesMethods;
