import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import APIURLUtilities from "./APIURLUtilities";
import GlobalServiceHandler from "./GlobalServiceHandler";

//Register Doctor In Admin Menu API Handler Method...
const registerDoctor = async (props) => {
  // console.log("Register Doctor Data In Admin Menu...");
  // console.log(props.doctorData);

  var childURL =
    APIURLUtilities.getAdminAPIChildURLKeys().adminAddDoctorAPIKey +
    UtilitiesMethods.getUserNameForLoggedInUser(); 

  await GlobalServiceHandler.hitPostService({
    childURL: childURL,
    postData: props.doctorData,
    responseDataHandler: (registeredDoctorData) => {
      console.log("Register Doctor Data In Admin Menu Response Data...");
      console.log(registeredDoctorData.responseData);

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

  var childURL = "addFrontDesk/" + UtilitiesMethods.getUSerIDForLoggedInUser();

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

//Get All Users List In Admin Menu API Handler Method...
const GetAdminAllRegisteredUserList = async (props) => {
  console.log("GetSuperAdminAllRegisteredUserList");

  // var hospitalID = "1";

  await GlobalServiceHandler.hitGetService({
    childURL:
      "getAllHospitalUsers/" + UtilitiesMethods.getUSerIDForLoggedInUser(),
    responseDataHandler: (allRegisteredUserListServiceData) => {
      console.log("allRegisteredUserListServiceData");
      //console.log(allRegisteredUserListServiceData.responseData.data);

      if (allRegisteredUserListServiceData.responseError === null) {
        // console.log("error not null");
        props.showAllRegisteredUserResponseHandler({
          isRegisteredUsersListRecieved: true,
          registeredUserListData:
            allRegisteredUserListServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (allRegisteredUserListServiceData.responseData === null) {
        // console.log("error  null");
        props.showAllRegisteredUserResponseHandler({
          isRegisteredUsersListRecieved: false,
          registeredUserListData: null,
          errorMessage: "Some error occured. Please try again later.",
        });
      }
    },
  });
};

const updateUserRegistrationData = async (props) => {
  console.log("updateUserData in super admin user related api handler");
  console.log(props.userData);

  var childURL = "updateDoctor";

  if (props.userData.userType === "Front Desk") {
    childURL = "updateFrontDesk";
  }

  await GlobalServiceHandler.hitPutService({
    childURL: childURL,
    postData: props.userData,
    responseDataHandler: (updatedUserData) => {
      console.log(
        "addNewUserServiceData in SuperAdminUserRelatedAPIHandler file is"
      );
      console.log(updatedUserData.responseData.data);

      if (updatedUserData.responseError === null) {
        props.modifyAdminUserDataResponseHandler({
          isUserDataUpdated: true,
          userUpdatedData: updatedUserData.responseData.data,
          errorMessage: null,
        });
      } else if (updatedUserData.responseData === null) {
        props.modifyAdminUserDataResponseHandler({
          isUserDataUpdated: null,
          userUpdatedData: null,
          errorMessage: updatedUserData.responseError.message,
        });
      }
    },
  });
};

const AdminAPIHandler = {
  registerDoctor,
  registerFrontDesk,
  GetAdminAllRegisteredUserList,
  updateUserRegistrationData,
};

export default AdminAPIHandler;
