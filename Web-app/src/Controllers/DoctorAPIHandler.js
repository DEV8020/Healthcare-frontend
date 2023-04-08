import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import GlobalServiceHandler from "./GlobalServiceHandler";


//Register Field Worker In Supervisor Menu API Handler Method...
const getFollowUpUpdates = async (props) => {
    // console.log("Register Field Worker In Supervisor Menu...");
    // console.log(props.fieldWorkerData);
  
    var childURL = "getListOfFollowUpsAssignedBy/" + UtilitiesMethods.getUSerIDForLoggedInUser();
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


  const DoctorAPIHandler = {
    getFollowUpUpdates,
  };
  
  export default DoctorAPIHandler;