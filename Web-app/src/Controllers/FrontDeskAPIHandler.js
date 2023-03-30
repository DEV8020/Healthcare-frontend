import GlobalServiceHandler from "./GlobalServiceHandler";

// patientData : patientData,
//   registerNewPatientResponseHandler : registerNewPatientResponseHandler,

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
            NewPatientData : registerNewPatientResponseData.responseData.data,
            errorMessage: null,
          });
        } else if (registerNewPatientResponseData.responseData === null) {
          props.registerNewPatientResponseCallBack({
            isNewPatientAdded: null,
            NewPatientData : null,
            errorMessage: registerNewPatientResponseData.responseError.message,
          });
        }
    },
  });
};



// registerUserData : registerUserData,
    //   addNewUserResponseHandler : addNewUserResponseHandler

// const AddNewUserData = async (props) => {

// const hospitalID = "55";;

//     console.log("addAdmin/55");
//     console.log(props.registerUserData);

//     //addAdmin/{hospitalId}

   

//     const childURL = "addAdmin/" + hospitalID;
//     console.log(childURL);
  
//     await GlobalServiceHandler.hitPostService({
//       childURL: childURL,
//       postData: props.registerUserData,
//       responseDataHandler: (addNewUserServiceData) => {
//          console.log("addNewUserServiceData");
//          console.log(addNewUserServiceData);
       
//           if (addNewUserServiceData.responseError === null) {
//             props.addNewUserResponseHandler({
//               isNewUserAdded: true,
//               newUserData : addNewUserServiceData.responseData.data,
//               errorMessage: null,
//             });
//           } else if (addNewUserServiceData.responseData === null) {
//             props.addNewUserResponseHandler({
//               isNewUserAdded: null,
//               newUserData : null,
//               errorMessage: addNewUserServiceData.responseError.message,
//             });
//           }
//       }
//     });
//   };


const FrontDeskAPIHandler = { RegisterNewPatientAPICall };
export default FrontDeskAPIHandler;