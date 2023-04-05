import GlobalServiceHandler from "./GlobalServiceHandler";

const registerDoctor = async (props) => {

  console.log("updateUserData in super admin user related api handler");
  console.log(props.userData);

  const hospitalID = "52";
  var childURL = "addDoctor/" + hospitalID;

//   doctorData: doctorData,
//   registerDoctorResponseHandler: registerDoctorResponseHandler,

  await GlobalServiceHandler.hitPostService({
    childURL: childURL,
    postData: props.doctorData,
    responseDataHandler: (registeredDoctorData) => {
      console.log(
        "addNewUserServiceData in SuperAdminUserRelatedAPIHandler file is"
      );
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

const AdminAPIHandler = {
    registerDoctor,
};

export default AdminAPIHandler;
