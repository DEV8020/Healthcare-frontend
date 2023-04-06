import GlobalServiceHandler from "./GlobalServiceHandler";

const getAllFieldWorkerListAPI = async (props) => {
  console.log("getAllFieldWorkerAPIList");
  console.log(props.supervisorID);

  const supervisorID = "1"; //props.supervisorID;

  //   return;

  // supervisorID : supervisorID,
  //   getAllFieldWorkerListAPIHandler : getAllFieldWorkerListAPIHandler

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

// const AddPatientEncounterAPICall = async (props) => {
//   console.log("AddPatientEncounterAPICall");
//   console.log(props.encounterData);

//   const modifiedChildURL =
//     "addPendingQueue/" +
//     props.encounterData.hospitalId +
//     "/" +
//     props.encounterData.patientId;

//   console.log(modifiedChildURL);

//   await GlobalServiceHandler.hitPostService({
//     childURL: modifiedChildURL,
//     postData: {},
//     responseDataHandler: (addPatientEncounterResponseData) => {
//       console.log("addPatientEncounterResponseData");
//       console.log(addPatientEncounterResponseData);
//       console.log(addPatientEncounterResponseData.responseData.data);
//       if (addPatientEncounterResponseData.responseError === null) {
//         props.addPatientNewEncounterResponseCallBack({
//           isEncounterAdded: true,
//           NewPatientData: addPatientEncounterResponseData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (addPatientEncounterResponseData.responseData === null) {
//         props.addPatientNewEncounterResponseCallBack({
//           isEncounterAdded: null,
//           NewPatientData: null,
//           errorMessage: addPatientEncounterResponseData.responseError.message,
//         });
//       }
//     },
//   });
// };

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
  //   AddPatientEncounterAPICall,
  //   GetPatientDetailsData,
};

export default SupervisorAPIHandler;
