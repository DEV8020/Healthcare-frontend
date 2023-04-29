import MessageComponent from "../Components/Screens/MessageComponent/MessageComponent";
import { aesUtil } from "./EncryptionUtility/aesUtil";
import UtilitiesKeys from "./UtilitiesKeys";
import CryptoJS from "crypto-js";

const getSpaceTrimmedLenght = (stringToMeasure) => {
  const lengthOfSpace = stringToMeasure.replace(/\s/g, "").length;
  return lengthOfSpace;
};

const getSupervisorIDForGlobalUserAPICalls = () => {
  return "1";
};

const showMessageBarAtTheBottom = (props) => {
  console.log(props);
  //props.isErrorMessage is to be replcaed from true...
  const isErrorMessageFlag = true; //props.isErrorMessage
  MessageComponent.showMessageScreen({
    message: { message: props.message, isTrueFlag: isErrorMessageFlag },
    alertMessageElement: props.alertMessageElement,
    alertMessageFlag: props.alertMessageFlag,
    isErrorMessage: isErrorMessageFlag,
  });
};

const cleanUpUserDataOnLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

const processUserLoginData = (userLoggedInData) => {
  console.log("processUserLoginData");
  console.log(userLoggedInData);
  localStorage.setItem("token", userLoggedInData.token);
  localStorage.setItem("username", userLoggedInData.username);
};

const getUSerIDForLoggedInUser = () => {
  return localStorage.getItem("userId");
};

const getAuthTokenForLoggedInUser = () => {
  return localStorage.getItem("token");
};

const getUserNameForLoggedInUser = () => {
  return localStorage.getItem("username");
};

const getErrorMessageKey = () => {
  return [UtilitiesKeys.getErrorMessageDataKeys().messageKey];
};

const getIsMessageErrorMessageKey = () => {
  return [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey];
};

const getMessageTypeKey = () => {
  return [UtilitiesKeys.getErrorMessageDataKeys().messageType];
};

const setAttributesDataForDoctor = (attributesData) => {
  localStorage.setItem("attributes", JSON.stringify(attributesData));
};

const getAttributesDataForDoctor = () => {
  return JSON.parse(localStorage.getItem("attributes"));
};

// aesUtil.encrypt("mypassword123", "plain text");
// -> ciphertext
// aesUtil.decrypt("mypassword123", "ciphertext");
// -> plain text

const getEncryptedData = (userData) => {
  var encryptedUserData = {};
  Object.keys(userData).map((key, index) => {
    console.log(aesUtil.encrypt("password", userData[key]));
    encryptedUserData = {
      ...encryptedUserData,
      ...{ [key]: aesUtil.encrypt("password", userData[key]) },
    };
  });
  return encryptedUserData;
};

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  showMessageBarAtTheBottom,
  getSupervisorIDForGlobalUserAPICalls,
  processUserLoginData,
  cleanUpUserDataOnLogOut,
  getUSerIDForLoggedInUser,
  getAuthTokenForLoggedInUser,
  getUserNameForLoggedInUser,
  getErrorMessageKey,
  getIsMessageErrorMessageKey,
  getAttributesDataForDoctor,
  setAttributesDataForDoctor,
  getEncryptedData,
  getMessageTypeKey
};

export default UtilitiesMethods;
