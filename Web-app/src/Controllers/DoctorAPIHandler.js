import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import GlobalServiceHandler from "./GlobalServiceHandler";

//Register Field Worker In Supervisor Menu API Handler Method...
const getFollowUpUpdates = async (props) => {
  // console.log("Register Field Worker In Supervisor Menu...");
  // console.log(props.fieldWorkerData);

  var childURL =
    "getListOfFollowUpsAssignedBy/" +
    UtilitiesMethods.getUSerIDForLoggedInUser();
  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    //   postData: props.fieldWorkerData,
    responseDataHandler: (followUpData) => {
      console.log("Register Field Worker Data In Admin Menu Response Data...");
      console.log(followUpData.responseData);

      if (followUpData.responseError === null) {
        props.fieldWorkerFollowUpsUpdates({
          isFollowUpsRecieved: true,
          followUpsData: followUpData.responseData.data,
          errorMessage: null,
        });
      } else if (followUpData.responseData === null) {
        props.fieldWorkerFollowUpsUpdates({
          isFollowUpsRecieved: false,
          followUpsData: null,
          errorMessage: followUpData.responseError.message,
        });
      }
    },
  });
};

//Register Field Worker In Supervisor Menu API Handler Method...
const getDoctorEncounterUpdates = async (props) => {
  // console.log("Register Field Worker In Supervisor Menu...");
  // console.log(props.fieldWorkerData);

  var childURL = "pendingQueue/" + UtilitiesMethods.getUSerIDForLoggedInUser();
  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    //   postData: props.fieldWorkerData,
    responseDataHandler: (encounterData) => {
      console.log("Register Field Worker Data In Admin Menu Response Data...");
      console.log(encounterData.responseData);

      if (encounterData.responseError === null) {
        props.doctorEncounterUpdatesData({
          isEncounterDataRecieved: true,
          encounterData: encounterData.responseData.data,
          errorMessage: null,
        });
      } else if (encounterData.responseData === null) {
        props.doctorEncounterUpdatesData({
          isEncounterDataRecieved: false,
          encounterData: null,
          errorMessage: encounterData.responseError.message,
        });
      }
    },
  });
};

//Register Field Worker In Supervisor Menu API Handler Method...
const getPatientHistoryUpdates = async (props) => {
  var childURL = "getMedicalHistory/" + props.patientID;
  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    responseDataHandler: (historyData) => {
      console.log("Register hisotry data In Admin Menu Response Data...");
      console.log(historyData.responseData);

      if (historyData.responseError === null) {
        props.patientHistoryAPIResponseHandler({
          isHistoryDataRecieved: true,
          historyData: historyData.responseData.data,
          errorMessage: null,
        });
      } else if (historyData.responseData === null) {
        props.patientHistoryAPIResponseHandler({
          isHistoryDataRecieved: false,
          historyData: null,
          errorMessage: historyData.responseError.message,
        });
      }
    },
  });
};

//   {
//     “encounterId”:
//     "prescription": "DOLO",
//     "symptoms": "Headache, Fever",
//     "followUpList":[
//         {
//             "doctorRemarks": "Check karle",
//             "date": "09-04-2023"
//         },
//         {
//             "doctorRemarks": "Check karle 2.0",
//             "date": "10-04-2023"
//         },
//         {
//             "doctorRemarks": "Check karle 3.0",
//             "date": "11-04-2023"
//         }
//     ]
//  }

//Register Field Worker In Supervisor Menu API Handler Method...
const savePatientEncounterData = async (props) => {
  console.log("create patient encounter In Doctor Menu...");
  console.log(props);

  //   prescriptionData: props.doctorPrescriptionData,
  //       followUpData : props.folloupsData,
  //       encounterID . props.encounterID,
  //       savePatientEncounterDataResponseHanlder:
  //         savePatientEncounterDataResponseHanlder,
  //     });
  // {prescription: 'safsdf', additionalNotes: 'fsgsgs'}

  var followUpDataList = [];
  for (var index in props.followUpData) {
    console.log("in map calling");
    console.log(props.followUpData[index]);
    followUpDataList = [...followUpDataList, props.followUpData[index]];
  }

  //{prescription: 'safsdf', additionalNotes: 'fsgsgs'}
  console.log(followUpDataList);
  // "prescription": "DOLO",
  // //     "symptoms": "Headache, Fever",
  // //     "followUpList":[

  var patientEncounterData = {
    encounterId: props.encounterID,
    prescription: props.prescriptionData.prescription,
    symptoms: props.prescriptionData.additionalNotes,
    followUpList : followUpDataList
  };

console.log("patientEncounterData called");
  console.log(patientEncounterData);
  var childURL = "saveEncounter"; //+ UtilitiesMethods.getUSerIDForLoggedInUser();
  console.log(childURL);

//   return;

  await GlobalServiceHandler.hitPutService({
    childURL: childURL,
    postData: patientEncounterData,
    responseDataHandler: (createdEncounterData) => {
      console.log(
        "Create patient encounter Data In Admin Menu Response Data..."
      );
      console.log(createdEncounterData.responseData);

      if (createdEncounterData.responseError === null) {
        props.savePatientEncounterDataResponseHanlder({
          isEncounterCreated: true,
          encounterData: createdEncounterData.responseData.data,
          errorMessage: null,
        });
      } else if (createdEncounterData.responseData === null) {
        props.savePatientEncounterDataResponseHanlder({
          isEncounterCreated: false,
          encounterData: null,
          errorMessage: createdEncounterData.responseError.message,
        });
      }
    },
  });
};

const addPatientEncounterData = async (props) => {
  console.log("create patient encounter In Doctor Menu...");
  console.log(props.patientData);

  // patientData: encounterData,
  //   addPatientEncounterResponseHandler: addPatientEncounterResponseHandler,

  //http://localhost:9191/addEncounter/{patientId}/{userId}

  var childURL =
    "addEncounter/" +
    props.patientData.patient.patientId +
    "/" +
    UtilitiesMethods.getUSerIDForLoggedInUser();
  console.log(childURL);
  console.log("child URL present");

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: childURL,
    //   postData: props.fieldWorkerData,
    responseDataHandler: (createdEncounterData) => {
      console.log(
        "Create patient encounter Data In Admin Menu Response Data..."
      );
      console.log(createdEncounterData.responseData);

      if (createdEncounterData.responseError === null) {
        props.addPatientEncounterResponseHandler({
          isEncounterCreated: true,
          encounterData: createdEncounterData.responseData.data,
          errorMessage: null,
        });
      } else if (createdEncounterData.responseData === null) {
        props.addPatientEncounterResponseHandler({
          isEncounterCreated: false,
          encounterData: null,
          errorMessage: createdEncounterData.responseError.message,
        });
      }
    },
  });
};

const DoctorAPIHandler = {
  getFollowUpUpdates,
  getDoctorEncounterUpdates,
  getPatientHistoryUpdates,
  savePatientEncounterData,
  addPatientEncounterData,
};

export default DoctorAPIHandler;
