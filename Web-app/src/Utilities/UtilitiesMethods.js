import MessageComponent from "../Components/Screens/MessageComponent/MessageComponent";
import UtilitiesKeys from "./UtilitiesKeys";

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

const setAttributesDataForDoctor = (attributesData) => {
  localStorage.setItem("attributes", attributesData);
  // return localStorage.getItem("token");
};

const getAttributesDataForDoctor = () => {
  return localStorage.getItem("attributes");
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
  setAttributesDataForDoctor
};

export default UtilitiesMethods;
