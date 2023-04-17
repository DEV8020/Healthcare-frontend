import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import APIURLUtilities from "./APIURLUtilities";
import GlobalServiceHandler from "./GlobalServiceHandler";

const getAllFieldWorkerListAPI = async (props) => {
  console.log("getAllFieldWorkerAPIList");
  console.log(props.supervisorID);

  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  // const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();
  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL:
      APIURLUtilities.getSupervisorAPIChildURLKeys()
        .supervisorGetFieldWorkerListAPIKey +
      UtilitiesMethods.getUserNameForLoggedInUser(),
    responseDataHandler: (fieldWorkerListResponseData) => {
      console.log("fieldWorkerListResponseData");
      console.log(fieldWorkerListResponseData);
      // console.log(fieldWorkerListResponseData.responseData);
      if (fieldWorkerListResponseData.responseError === null) {
        props.getAllFieldWorkerListAPIHandler({
          isFieldWorkerListRecieved: true,
          fieldWorkerListData: fieldWorkerListResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (fieldWorkerListResponseData.responseData === null) {
        props.getAllFieldWorkerListAPIHandler({
          isFieldWorkerListRecieved: false,
          fieldWorkerListData: null,
          errorMessage: fieldWorkerListResponseData.responseError.message,
        });
      }
    },
  });
};

const GetFieldWorkerFollowUpsAPICall = async (props) => {
  // console.log("GetFieldWorkerFollowUpsAPICall");
  // console.log(props.fieldWorkerData);

  //This methos will give the supervisor id when its logged in...
  //We have to use this id in API Calls...
  const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();

  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys()
      .supervisorGetFieldWorkerFollowUpListAPIKey +
    props.fieldWorkerData.authId;

  console.log(modifiedChildURL);
  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: modifiedChildURL,
    responseDataHandler: (getFieldWorkerFollowUpsResponseData) => {
      console.log("addPatientEncounterResponseData");
      console.log(getFieldWorkerFollowUpsResponseData);
      if (getFieldWorkerFollowUpsResponseData.responseError === null) {
        props.getFieldWorkerFollowUpsAPIHandler({
          isFollowUpsDataRecieved: true,
          FollowUpsData: getFieldWorkerFollowUpsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (getFieldWorkerFollowUpsResponseData.responseData === null) {
        props.getFieldWorkerFollowUpsAPIHandler({
          isFollowUpsDataRecieved: null,
          FollowUpsData: null,
          errorMessage:
            getFieldWorkerFollowUpsResponseData.responseError.message,
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
  // const supervisorID = UtilitiesMethods.getSupervisorIDForGlobalUserAPICalls();

  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys()
      .supervisorGetUnassignedPatientsListAPIKey +
    UtilitiesMethods.getUserNameForLoggedInUser(); //+ supervisorID;

  console.log(modifiedChildURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: modifiedChildURL,
    responseDataHandler: (unAssignedFollowUpsResponseData) => {
      // console.log("addPatientEncounterResponseData");
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
  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys().supervisorAssignFollowUpAPIKey +
    props.unassignedPatientData.fieldWorkerID +
    "/" +
    props.unassignedPatientData.patientId;

  await GlobalServiceHandler.hitPutService({
    childURL: modifiedChildURL,
    postData: props.unassignedPatientData,
    responseDataHandler: (assignUnAssignedFollowUpResponseData) => {
      if (assignUnAssignedFollowUpResponseData.responseError === null) {
        props.assignUnAssignedFollowUpResponseHanlder({
          isFollowUpAssigned: true,
          assignedFollowUpData:
            assignUnAssignedFollowUpResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (assignUnAssignedFollowUpResponseData.responseData === null) {
        props.assignUnAssignedFollowUpResponseHanlder({
          isFollowUpAssigned: false,
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
  GetFieldWorkerFollowUpsAPICall,
  GetSupervisorUnassignedFollowUpsAPICall,
  GetUnassignedPatientListAPICall,
  AssignUnAssignedFollowUpAPICall,
};

export default SupervisorAPIHandler;
