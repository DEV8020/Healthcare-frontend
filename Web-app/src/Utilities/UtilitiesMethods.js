import MessageComponent from "../Components/Screens/MessageComponent/MessageComponent";

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
  localStorage.removeItem("authId");
  localStorage.removeItem("userId");
};



const processUserLoginData = (userLoggedInData) => {
  console.log("processUserLoginData");
  console.log(userLoggedInData);

  if (userLoggedInData.userType === "Front Desk") {
    localStorage.setItem("authId", userLoggedInData.authId);
    localStorage.setItem("userId", userLoggedInData.userId);
  }
};

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  showMessageBarAtTheBottom,
  getSupervisorIDForGlobalUserAPICalls,
  processUserLoginData,
  cleanUpUserDataOnLogOut
};

export default UtilitiesMethods;
