import GlobalServiceHandler from "./GlobalServiceHandler";

const RegisterNewPatientAPICall = async (props) => {
  console.log("RegisterNewPatientAPICall");
  console.log(props.patientData);

  await GlobalServiceHandler.hitPostService({
    childURL: "addPatients",
    postData: props.patientData,
    responseDataHandler: (registerNewPatientResponseData) => {
      console.log("registerNewPatientResponseData");
      console.log(registerNewPatientResponseData);
      console.log(registerNewPatientResponseData.responseData.data);
      if (registerNewPatientResponseData.responseError === null) {
        props.registerNewPatientResponseCallBack({
          isNewPatientAdded: true,
          NewPatientData: registerNewPatientResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (registerNewPatientResponseData.responseData === null) {
        props.registerNewPatientResponseCallBack({
          isNewPatientAdded: null,
          NewPatientData: null,
          errorMessage: registerNewPatientResponseData.responseError.message,
        });
      }
    },
  });
};

const AddPatientEncounterAPICall = async (props) => {
  console.log("AddPatientEncounterAPICall");
  console.log(props.encounterData);

  const modifiedChildURL =
    "addPendingQueue/" +
    props.encounterData.hospitalId +
    "/" +
    props.encounterData.patientId;

  console.log(modifiedChildURL);

  await GlobalServiceHandler.hitPostService({
    childURL: modifiedChildURL,
    postData: {},
    responseDataHandler: (addPatientEncounterResponseData) => {
      console.log("addPatientEncounterResponseData");
      console.log(addPatientEncounterResponseData);
      console.log(addPatientEncounterResponseData.responseData.data);
      if (addPatientEncounterResponseData.responseError === null) {
        props.addPatientNewEncounterResponseCallBack({
          isEncounterAdded: true,
          NewPatientData: addPatientEncounterResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (addPatientEncounterResponseData.responseData === null) {
        props.addPatientNewEncounterResponseCallBack({
          isEncounterAdded: null,
          NewPatientData: null,
          errorMessage: addPatientEncounterResponseData.responseError.message,
        });
      }
    },
  });
};


//Get All Users List In Admin Menu API Handler Method...
const GetPatientDetailsData = async (props) => {
  console.log("GetSuperAdminAllRegisteredUserList");

  var patientID = props.patientID;

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: "getPatientById/" + patientID,
    responseDataHandler: (getPatientDetailsServiceData) => {
      console.log("getPatientDetailsServiceData");
      //console.log(getPatientDetailsServiceData.responseData.data);

      if (getPatientDetailsServiceData.responseError === null) {
        props.getPatientDetailsResponseHandler({
          isPatientDetailsRecievedSuccessFully: true,
          patientDetailsData:
          getPatientDetailsServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (getPatientDetailsServiceData.responseData === null) {
        props.getPatientDetailsResponseHandler({
          isPatientDetailsRecievedSuccessFully: false,
          patientDetailsData: null,
          errorMessage: getPatientDetailsServiceData.responseError.message,
        });
      }
    },
  });
};

const FrontDeskAPIHandler = {
  RegisterNewPatientAPICall,
  AddPatientEncounterAPICall,
  GetPatientDetailsData,
};

export default FrontDeskAPIHandler;
