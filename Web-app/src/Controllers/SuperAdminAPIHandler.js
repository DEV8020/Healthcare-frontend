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
            HospitalData : addHospitalServiceData.responseData.data,
            errorMessage: null,
          });
        } else if (addHospitalServiceData.responseData === null) {
          props.addHospitalResponseHandler({
            isHospitalAdded: null,
            HospitalData : null,
            errorMessage: addHospitalServiceData.responseError.message,
          });
        }
    },
  });
};



// registerUserData : registerUserData,
    //   addNewUserResponseHandler : addNewUserResponseHandler

const AddNewUserData = async (props) => {

const hospitalID = "55";;

    console.log("addAdmin/55");
    console.log(props.registerUserData);

    //addAdmin/{hospitalId}

   

    const childURL = "addAdmin/" + hospitalID;
    console.log(childURL);
  
    await GlobalServiceHandler.hitPostService({
      childURL: childURL,
      postData: props.registerUserData,
      responseDataHandler: (addNewUserServiceData) => {
         console.log("addNewUserServiceData");
         console.log(addNewUserServiceData);
       
          if (addNewUserServiceData.responseError === null) {
            props.addNewUserResponseHandler({
              isNewUserAdded: true,
              newUserData : addNewUserServiceData.responseData.data,
              errorMessage: null,
            });
          } else if (addNewUserServiceData.responseData === null) {
            props.addNewUserResponseHandler({
              isNewUserAdded: null,
              newUserData : null,
              errorMessage: addNewUserServiceData.responseError.message,
            });
          }
      }
    });
  };



const SuperAdminAPIHandler = { AddHospitalData, AddNewUserData };
export default SuperAdminAPIHandler;
