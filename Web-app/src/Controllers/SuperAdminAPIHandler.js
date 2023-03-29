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

const SuperAdminAPIHandler = { AddHospitalData };
export default SuperAdminAPIHandler;
