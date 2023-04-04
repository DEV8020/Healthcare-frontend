import MessageComponent from "../Components/Screens/MessageComponent/MessageComponent";

const getSpaceTrimmedLenght = (stringToMeasure) => {
    const lengthOfSpace = stringToMeasure.replace(/\s/g, '').length;
    return lengthOfSpace;
}

const showMessageBarAtTheBottom = (props) => {
    console.log(props);
    //props.isErrorMessage is to be replcaed from true...
    const isErrorMessageFlag = true;//props.isErrorMessage
    MessageComponent.showMessageScreen({
      message: { message: props.message, isTrueFlag: isErrorMessageFlag },
      alertMessageElement: props.alertMessageElement,
      alertMessageFlag: props.alertMessageFlag,
      isErrorMessage: isErrorMessageFlag,
    });
  };

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  showMessageBarAtTheBottom
};

export default UtilitiesMethods;
