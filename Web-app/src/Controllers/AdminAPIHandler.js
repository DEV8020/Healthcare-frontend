import GlobalServiceHandler from "./GlobalServiceHandler";

//Register Doctor In Admin Menu API Handler Method...
const registerDoctor = async (props) => {
  console.log("Register Doctor Data In Admin Menu...");
  console.log(props.userData);

  const hospitalID = "52";
  var childURL = "addDoctor/" + hospitalID;

  await GlobalServiceHandler.hitPostService({
    childURL: childURL,
    postData: props.doctorData,
    responseDataHandler: (registeredDoctorData) => {
      console.log("Register Doctor Data In Admin Menu Response Data...");
      console.log(registeredDoctorData.responseData.data);

      if (registeredDoctorData.responseError === null) {
        props.registerDoctorResponseHandler({
          isDoctorRegisteredSuccessfully: true,
          registeredDoctorData: registeredDoctorData.responseData.data,
          errorMessage: null,
        });
      } else if (registeredDoctorData.responseData === null) {
        props.registerDoctorResponseHandler({
          isDoctorRegisteredSuccessfully: null,
          registeredDoctorData: null,
          errorMessage: registeredDoctorData.responseError.message,
        });
      }
    },
  });
};

//Register Front Desk In Admin Menu API Handler Method...
const registerFrontDesk = async (props) => {
  console.log("Register Front Desk Data In Admin Menu...");
  console.log(props.frontDeskData);

  const hospitalID = "52";
  var childURL = "addFrontDesk/" + hospitalID;

  await GlobalServiceHandler.hitPostService({
    childURL: childURL,
    postData: props.frontDeskData,
    responseDataHandler: (registeredFrontDeskData) => {
        console.log("Register Front Desk Data In Admin Menu Response Data...");
      console.log(registeredFrontDeskData.responseData.data);

      if (registeredFrontDeskData.responseError === null) {
        props.registerFrontDeskResponseHandler({
          isFrontDeskRegisteredSuccessfully: true,
          registeredFrontDeskData: registeredFrontDeskData.responseData.data,
          errorMessage: null,
        });
      } else if (registeredFrontDeskData.responseData === null) {
        props.registerFrontDeskResponseHandler({
          isFrontDeskRegisteredSuccessfully: null,
          registeredFrontDeskData: null,
          errorMessage: registeredFrontDeskData.responseError.message,
        });
      }
    },
  });
};


const AdminAPIHandler = {
  registerDoctor,
  registerFrontDesk,
};

export default AdminAPIHandler;
