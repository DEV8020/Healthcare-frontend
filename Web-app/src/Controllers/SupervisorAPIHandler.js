import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import GlobalServiceHandler from "./GlobalServiceHandler";

const getAllFieldWorkerListAPI = async (props) => {
  console.log("getAllFieldWorkerAPIList");
  console.log(props.supervisorID);

  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();
  await GlobalServiceHandler.hitGetService({
    childURL: "getFieldWorkers/" + supervisorID,
    responseDataHandler: (fieldWorkerListResponseData) => {
      console.log("fieldWorkerListResponseData");
      console.log(fieldWorkerListResponseData);
      console.log(fieldWorkerListResponseData.responseData.data);
      if (fieldWorkerListResponseData.responseError === null) {
        props.getAllFieldWorkerListAPIHandler({
          isFieldWorkerListRecieved: true,
          fieldWorkerListData: fieldWorkerListResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (fieldWorkerListResponseData.responseData === null) {
        props.getAllFieldWorkerListAPIHandler({
          isFieldWorkerListRecieved: null,
          fieldWorkerListData: null,
          errorMessage: fieldWorkerListResponseData.responseError.message,
        });
      }
    },
  });
};

const GetFieldWorkerDetailsAPICall = async (props) => {
  console.log("GetFieldWorkerDetailsAPICall");
  console.log(props.fieldWorkerData);
  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();

  const modifiedChildURL =
    "addPendingQueue/" +
    props.encounterData.hospitalId +
    "/" +
    props.encounterData.patientId;

  console.log(modifiedChildURL);

  return;

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

// http://localhost:9191/unassignedPatients/{SupervisorId}

const GetUnassignedPatientListAPICall = async (props) => {
  console.log("GetUnassignedPatientListAPICall");
  console.log(props.fieldWorkerData);
  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  const supervisorID = UtilitiesMethods.getUSerIDForLoggedInUser();

  const modifiedChildURL = "unassignedPatients/" + supervisorID;

  console.log(modifiedChildURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: modifiedChildURL,
    responseDataHandler: (unAssignedFollowUpsResponseData) => {
      console.log("addPatientEncounterResponseData");
      console.log(unAssignedFollowUpsResponseData);
      // console.log(unAssignedFollowUpsResponseData.responseData.data);
      if (unAssignedFollowUpsResponseData.responseError === null) {
        props.getUnassignedFollowUpsAPIHandler({
          isUnassignedListRecieved: true,
          UnAssignedFollowUpData:
            unAssignedFollowUpsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (unAssignedFollowUpsResponseData.responseData === null) {
        props.getUnassignedFollowUpsAPIHandler({
          isUnassignedListRecieved: false,
          UnAssignedFollowUpData: null,
          errorMessage: unAssignedFollowUpsResponseData.responseError.message,
        });
      }
    },
  });
};

const GetSupervisorUnassignedFollowUpsAPICall = async (props) => {
  console.log("GetFSupervisorUnassignedFollowUpsAPICall");
  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();

  await GlobalServiceHandler.hitGetService({
    childURL:
      "getFollowUps/" + UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls(),
    responseDataHandler: (unAssignedFollowUpsResponseData) => {
      console.log("unAssignedFollowUpsResponseData");
      console.log(unAssignedFollowUpsResponseData);
      console.log(unAssignedFollowUpsResponseData.responseData.data);
      if (unAssignedFollowUpsResponseData.responseError === null) {
        props.addPatientNewEncounterResponseCallBack({
          isEncounterAdded: true,
          NewPatientData: unAssignedFollowUpsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (unAssignedFollowUpsResponseData.responseData === null) {
        props.addPatientNewEncounterResponseCallBack({
          isEncounterAdded: null,
          NewPatientData: null,
          errorMessage: unAssignedFollowUpsResponseData.responseError.message,
        });
      }
    },
  });
};

// fieldWorkerID : fieldWorkerIDField,
// unassignedPatientData : unAssignedFollowUpsData,
// assignUnAssignedFollowUpResponseHanlder : assignUnAssignedFollowUpResponseHanlder

const AssignUnAssignedFollowUpAPICall = async (props) => {
  console.log("AssignUnAssignedFollowUpAPICall");
  console.log(props.unassignedPatientData);
  console.log(props.unassignedPatientData);

  // Endpoint: http://localhost:9191/getFieldWorkers/{FieldWorkerId}/{PatientId}
  // Default: FieldWorkerId = 6, PatientId = 1
  //

  const modifiedChildURL =
    "getFieldWorkers/" +
    props.unassignedPatientData.fieldWorkerID +
    "/" +
    props.unassignedPatientData.patientId;

  console.log(modifiedChildURL);

  // return;

  await GlobalServiceHandler.hitPostService({
    childURL: modifiedChildURL,
    postData: props.unassignedPatientData,
    responseDataHandler: (assignUnAssignedFollowUpResponseData) => {
      console.log("AssignUnAssignedFollowUpAPICall");
      console.log(assignUnAssignedFollowUpResponseData);
      console.log(assignUnAssignedFollowUpResponseData.responseData.data);
      if (assignUnAssignedFollowUpResponseData.responseError === null) {
        props.assignUnAssignedFollowUpResponseHanlder({
          isFollowUpAssigned: true,
          assignedFollowUpData:
            assignUnAssignedFollowUpResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (assignUnAssignedFollowUpResponseData.responseData === null) {
        props.assignUnAssignedFollowUpResponseHanlder({
          isFollowUpAssigned: null,
          assignedFollowUpData: null,
          errorMessage:
            assignUnAssignedFollowUpResponseData.responseError.message,
        });
      }
    },
  });
};

// //Get All Users List In Admin Menu API Handler Method...
// const GetPatientDetailsData = async (props) => {
//   console.log("GetSuperAdminAllRegisteredUserList");

//   var patientID = props.patientID;

//   await GlobalServiceHandler.hitGetService({
//     childURL: "getPatientById/" + patientID,
//     responseDataHandler: (getPatientDetailsServiceData) => {
//       console.log("getPatientDetailsServiceData");
//       console.log(getPatientDetailsServiceData.responseData.data);

//       if (getPatientDetailsServiceData.responseError === null) {
//         props.getPatientDetailsResponseHandler({
//           isPatientDetailsRecievedSuccessFully: true,
//           patientDetailsData:
//           getPatientDetailsServiceData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (getPatientDetailsServiceData.responseData === null) {
//         props.getPatientDetailsResponseHandler({
//           isPatientDetailsRecievedSuccessFully: null,
//           patientDetailsData: null,
//           errorMessage: getPatientDetailsServiceData.responseError.message,
//         });
//       }
//     },
//   });
// };

const SupervisorAPIHandler = {
  getAllFieldWorkerListAPI,
  GetFieldWorkerDetailsAPICall,
  GetSupervisorUnassignedFollowUpsAPICall,
  GetUnassignedPatientListAPICall,
  AssignUnAssignedFollowUpAPICall,
  //   AddPatientEncounterAPICall,
  //   GetPatientDetailsData,
};

export default SupervisorAPIHandler;
