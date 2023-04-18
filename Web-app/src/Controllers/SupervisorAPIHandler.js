import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import APIURLUtilities from "./APIURLUtilities";
import GlobalServiceHandler from "./GlobalServiceHandler";

const getAllFieldWorkerListAPI = async (props) => {
  console.log("getAllFieldWorkerAPIList");
  console.log(props.supervisorID);

 
  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL:
      APIURLUtilities.getSupervisorAPIChildURLKeys()
        .supervisorGetFieldWorkerListAPIKey +
      UtilitiesMethods.getUserNameForLoggedInUser(),
    responseDataHandler: (fieldWorkerListResponseData) => {
      console.log("fieldWorkerListResponseData");
      console.log(fieldWorkerListResponseData);
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
          isFollowUpsDataRecieved: false,
          FollowUpsData: [],
          errorMessage:
            getFieldWorkerFollowUpsResponseData.responseError.message,
        });
      }
    },
  });
};

const GetFieldWorkerAssignedPatientsListAPICall = async (props) => {
  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys()
      .supervisorGetFieldWorkerAssignedPatientsAPIKey +
    props.fieldWorkerData.authId;

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: modifiedChildURL,
    responseDataHandler: (getFieldWorkerAssignedPatientsResponseData) => {
      if (getFieldWorkerAssignedPatientsResponseData.responseError === null) {
        props.getAssignedPatientsAPIHandler({
          isPatientsListRecieved: true,
          assignedPatientsListData:
          getFieldWorkerAssignedPatientsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (getFieldWorkerAssignedPatientsResponseData.responseData === null) {
        props.getAssignedPatientsAPIHandler({
          isPatientsListRecieved: false,
          assignedPatientsListData: [],
          errorMessage:
          getFieldWorkerAssignedPatientsResponseData.responseError.message,
        });
      }
    },
  });
};


const GetUnassignedPatientListAPICall = async (props) => {
  console.log("GetUnassignedPatientListAPICall");
  console.log(props.fieldWorkerData);


  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys()
      .supervisorGetUnassignedPatientsListAPIKey +
    UtilitiesMethods.getUserNameForLoggedInUser(); 

  console.log(modifiedChildURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: modifiedChildURL,
    responseDataHandler: (unAssignedFollowUpsResponseData) => {
      console.log(unAssignedFollowUpsResponseData);
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



const AssignUnAssignedFollowUpAPICall = async (props) => {
  const modifiedChildURL =
    APIURLUtilities.getSupervisorAPIChildURLKeys()
      .supervisorAssignFollowUpAPIKey +
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


const SupervisorAPIHandler = {
  getAllFieldWorkerListAPI,
  GetFieldWorkerFollowUpsAPICall,
  GetSupervisorUnassignedFollowUpsAPICall,
  GetUnassignedPatientListAPICall,
  AssignUnAssignedFollowUpAPICall,
  GetFieldWorkerAssignedPatientsListAPICall,
};

export default SupervisorAPIHandler;
