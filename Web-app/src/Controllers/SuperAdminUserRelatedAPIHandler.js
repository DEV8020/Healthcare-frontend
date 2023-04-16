import SuperAdminUtilitiesKeys from "../UIScreens/SuperAdminModule/SuperAdminUtilitiesKeys/SuperAdminUtilitiesKeys";
import UtilitiesKeys from "../Utilities/UtilitiesKeys";
import APIURLUtilities from "./APIURLUtilities";
import GlobalServiceHandler from "./GlobalServiceHandler";

const updateUserData = async (props) => {
  console.log("updateUserData in super admin user related api handler");
  console.log(props.userData);

  var childURL =
    APIURLUtilities.getSuperAdminAPIChildURLKeys().superAdminUpdateAdminAPIKey;

  const userType = SuperAdminUtilitiesKeys.getUserType(
    props.userData[SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey]
  );

  if ([SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey]) {
  }
  if (userType === UtilitiesKeys.getUserTypeKeys().superVisorKey) {
    childURL =
      APIURLUtilities.getSuperAdminAPIChildURLKeys()
        .superAdminUpdateSuperVisorAPIKey;
  }

  await GlobalServiceHandler.hitPutService({
    childURL: childURL,
    postData: props.userData,
    responseDataHandler: (updatedUserData) => {
      console.log(
        "addNewUserServiceData in SuperAdminUserRelatedAPIHandler file is"
      );
      console.log(updatedUserData.responseData);

      if (updatedUserData.responseError === null) {
        props.modifyUserDataResponseHandler({
          isUserDataUpdated: true,
          userUpdatedData: updatedUserData.responseData.data,
          errorMessage: null,
        });
      } else if (updatedUserData.responseData === null) {
        props.modifyUserDataResponseHandler({
          isUserDataUpdated: false,
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
