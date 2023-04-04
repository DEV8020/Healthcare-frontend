import GlobalServiceHandler from "./GlobalServiceHandler";

const updateUserData = async (props) => {

  console.log("updateUserData in super admin user related api handler");
  console.log(props.userData);

  var childURL = "updateAdmin"; 

  await GlobalServiceHandler.hitPutService({
    childURL: childURL,
    postData: props.userData,
    responseDataHandler: (updatedUserData) => {
      console.log(
        "addNewUserServiceData in SuperAdminUserRelatedAPIHandler file is"
      );
      console.log(updatedUserData.responseData.data);

      if (updatedUserData.responseError === null) {
        props.modifyUserDataResponseHandler({
          isUserDataUpdated: true,
          userUpdatedData: updatedUserData.responseData.data,
          errorMessage: null,
        });
      } else if (updatedUserData.responseData === null) {
        props.modifyUserDataResponseHandler({
          isUserDataUpdated: null,
          userUpdatedData: null,
          errorMessage: updatedUserData.responseError.message,
        });
      }
    },
  });
};


const SuperAdminUserRelatedAPIHandler = {
  updateUserData,
};

export default SuperAdminUserRelatedAPIHandler;
