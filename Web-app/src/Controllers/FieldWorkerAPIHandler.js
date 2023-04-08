import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import GlobalServiceHandler from "./GlobalServiceHandler";


//Register Field Worker In Supervisor Menu API Handler Method...
const registerFieldWorker = async (props) => {
    console.log("Register Field Worker In Supervisor Menu...");
    console.log(props.fieldWorkerData);

    // fieldWorkerData: selectedDataFromFieldWorkerRegistration,
    // registerNewFieldWorkerResponseCallBack:
    //   registerNewFieldWorkerResponseCallBack,
  
    var childURL = "addFieldWorker/" + UtilitiesMethods.getUSerIDForLoggedInUser();
    console.log(childURL);
  
    await GlobalServiceHandler.hitCustomResponsePostService({
      childURL: childURL,
      postData: props.fieldWorkerData,
      responseDataHandler: (registeredFieldWorkerData) => {
        console.log("Register Field Worker Data In Admin Menu Response Data...");
        console.log(registeredFieldWorkerData.responseData);
  
        if (registeredFieldWorkerData.responseError === null) {
          props.registerNewFieldWorkerResponseCallBack({
            isFieldWorkerRegistered: true,
            registeredFieldWorkerData: registeredFieldWorkerData.responseData.data,
            errorMessage: null,
          });
        } else if (registeredFieldWorkerData.responseData === null) {
          props.registerNewFieldWorkerResponseCallBack({
            isFieldWorkerRegistered: false,
            registeredFieldWorkerData: null,
            errorMessage: registeredFieldWorkerData.responseError.message,
          });
        }
      },
    });
  };


  const FieldWorkerAPIHandler = {
    registerFieldWorker,
  };
  
  export default FieldWorkerAPIHandler;