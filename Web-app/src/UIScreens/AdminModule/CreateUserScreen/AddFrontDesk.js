import React, { useState } from "react";
import classes from "./AddOptions.module.css";
import MenuSubmitButton from "../../../Components/Screens/UI Elements/MenuSubmitButton/MenuSubmitButton";
import AdminAPIHandler from "../../../Controllers/AdminAPIHandler";
import InputTextField from "../../../Component/InputTextField/InputTextField";
import AdminUtilities from "../../../Utilities/AdminUtilities/AdminUtilities";
import UtilitiesKeys from "../../../Utilities/UtilitiesKeys";

const AddFrontDesk = (props) => {
  const [frontDeskRegistrationData, setFrontDeskRegistrationData] = useState(
    AdminUtilities.getCreateFrontDeskInitialData()
  );
 

  //########################## Data Change Event Handler Methods  ##########################
  const updateFrontDeskRegistrationData = (dataToUpdate) => {
    setFrontDeskRegistrationData((frontDeskData) => {
      console.log({ ...frontDeskData, ...dataToUpdate });
      return { ...frontDeskData, ...dataToUpdate };
    });
  };
  //########################## Data Change Event Handler Methods Ends Here  ##########################

  const AddFrontDeskDataHandler = (event) => {
    event.preventDefault();
    AdminAPIHandler.registerFrontDesk({
      frontDeskData: frontDeskRegistrationData,
      registerFrontDeskResponseHandler: registerFrontDeskResponseHandler,
    });
  };

  const registerFrontDeskResponseHandler = (frontDeskRegistrationData) => {
    if (frontDeskRegistrationData.isFrontDeskRegisteredSuccessfully === true) {
      cleanDataAfterFrontDeskRegistrationHandler(
        frontDeskRegistrationData.registeredFrontDeskData
      );
    } else {
      showMessageBarAtTheBottom({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          frontDeskRegistrationData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
    }
  };

  //Message Bar At The Bottom to display messages...
  const showMessageBarAtTheBottom = (propData) => {
    props.showMessageAtBottomBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        propData[UtilitiesKeys.getErrorMessageDataKeys().messageKey],
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]:
        propData[UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey],
    });
  };

  const cleanDataAfterFrontDeskRegistrationHandler = () => {
    showMessageBarAtTheBottom({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Front Desk registered successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
    });

    setFrontDeskRegistrationData(
      AdminUtilities.getCreateFrontDeskInitialData()
    );
    props.refreshUsersListResponseHandler();
    BackButtonPressedHandler();
  };

  const BackButtonPressedHandler = () => {
    props.setAdminOption(AdminUtilities.getAdminMenuOptionsNameKeys().createFrontDeskKey);
  };

  return (
    <div>
      <div className={classes.center}>
        <h1> Add Front Desk Menu</h1>

        <form id="addFD-form" onSubmit={AddFrontDeskDataHandler}>
         
          <InputTextField
            label={
              AdminUtilities.getCreateFrontDeskLabelKeys().frontDeskUserIDKey
            }
            mappedKey={AdminUtilities.getCreateUserDataKeys().userIDKey}
            onChange={updateFrontDeskRegistrationData}
            value={
              frontDeskRegistrationData[
                AdminUtilities.getCreateUserDataKeys().userIDKey
              ]
            }
          />

          <InputTextField
            label={
              AdminUtilities.getCreateFrontDeskLabelKeys().frontDeskUserNameKey
            }
            mappedKey={AdminUtilities.getCreateUserDataKeys().userNameKey}
            onChange={updateFrontDeskRegistrationData}
            value={
              frontDeskRegistrationData[
                AdminUtilities.getCreateUserDataKeys().userNameKey
              ]
            }
          />

          <InputTextField
            label={
              AdminUtilities.getCreateFrontDeskLabelKeys().frontDeskPasswordKey
            }
            mappedKey={AdminUtilities.getCreateUserDataKeys().userPasswordKey}
            onChange={updateFrontDeskRegistrationData}
            value={
              frontDeskRegistrationData[
                AdminUtilities.getCreateUserDataKeys().userPasswordKey
              ]
            }
          />

          <div>
            <MenuSubmitButton value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFrontDesk;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
