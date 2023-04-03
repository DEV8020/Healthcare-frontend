import GlobalServiceHandler from "./GlobalServiceHandler";

const AddHospitalData = async (props) => {
  console.log("AddHospitalData");
  console.log(props.hospitalData);

  await GlobalServiceHandler.hitPostService({
    childURL: "addHospital",
    postData: props.hospitalData,
    responseDataHandler: (addHospitalServiceData) => {
      console.log("addHospitalServiceData");
      console.log(addHospitalServiceData);
      if (addHospitalServiceData.responseError === null) {
        props.addHospitalResponseHandler({
          isHospitalAdded: true,
          HospitalData: addHospitalServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (addHospitalServiceData.responseData === null) {
        props.addHospitalResponseHandler({
          isHospitalAdded: null,
          HospitalData: null,
          errorMessage: addHospitalServiceData.responseError.message,
        });
      }
    },
  });
};


const AddNewUserData = async (props) => {
  const updatedData = {
    ...props.registerUserData,
    name: props.registerUserData.userId,
  };

  var childURL = "addAdmin/" + props.registerUserData.hospitalId;
  if (props.registerUserData.userType === "Supervisor") {
    childURL = "addSupervisor";
  }
  console.log(childURL);

  await GlobalServiceHandler.hitPostService({
    childURL: childURL,
    postData: updatedData,
    responseDataHandler: (addNewUserServiceData) => {
      console.log("addNewUserServiceData");
      console.log(addNewUserServiceData.responseData.data);

      if (addNewUserServiceData.responseError === null) {
        props.addNewUserResponseHandler({
          isNewUserAdded: true,
          newUserData: addNewUserServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (addNewUserServiceData.responseData === null) {
        props.addNewUserResponseHandler({
          isNewUserAdded: null,
          newUserData: null,
          errorMessage: addNewUserServiceData.responseError.message,
        });
      }
    },
  });
};

const GetHospitalListsDataWithNoAdmins = async (props) => {
  console.log("GetHospitalListsDataWithNoAdmins");

  await GlobalServiceHandler.hitGetService({
    childURL: "hospitalsWithNoAdmins",
    responseDataHandler: (hospitalsListServiceData) => {
      console.log("GetHospitalListsDataWithNoAdmins");
      console.log(hospitalsListServiceData.responseData.data);

      if (hospitalsListServiceData.responseError === null) {
        props.hopitalListWithNoAdminsResponseHandler({
          isHospitalListRecieved: true,
          hospitalListData: hospitalsListServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (hospitalsListServiceData.responseData === null) {
        props.hopitalListWithNoAdminsResponseHandler({
          isHospitalListRecieved: null,
          hospitalListData: null,
          errorMessage: hospitalsListServiceData.responseError.message,
        });
      }
    },
  });
};

const SuperAdminAPIHandler = {
  AddHospitalData,
  AddNewUserData,
  GetHospitalListsDataWithNoAdmins,
};
export default SuperAdminAPIHandler;