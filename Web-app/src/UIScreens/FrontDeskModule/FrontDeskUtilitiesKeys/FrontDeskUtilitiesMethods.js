{
  /* <div>ID : {patientDetailsData.patientId}</div>
          <div>Name : {patientDetailsData.name}</div>
          <div>Age : {patientDetailsData.age}</div>
          <div>Sex : {patientDetailsData.sex}</div>
          <div>Contact : {patientDetailsData.contact}</div> */
}

const processPatientDetailDataToDisplay = (prop) => {
  console.log("processPatientDetailDataToDisplay");
  console.log(prop);
  return {
    Name: prop.name,
    Age: prop.age,
    Sex: prop.sex,
    Contact: prop.contact,
  };
};

const FrontDeskUtilitiesMethods = {
  processPatientDetailDataToDisplay,
  //   getPatientRegistrationDataKeys,
  //   getPatientRegistrationInitialData,
  //   getPatientRegistrationLabelKeys,
};

export default FrontDeskUtilitiesMethods;
