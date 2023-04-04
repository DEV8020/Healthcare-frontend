import MessageComponent from "../Components/Screens/MessageComponent/MessageComponent";

const getSpaceTrimmedLenght = (stringToMeasure) => {
    const lengthOfSpace = stringToMeasure.replace(/\s/g, '').length;
    return lengthOfSpace;
}

const showMessageBarAtTheBottom = (props) => {
    MessageComponent.showMessageScreen({
      message: { message: props.message, isTrueFlag: props.isErrorMessage },
      alertMessageElement: props.alertMessageElement,
      alertMessageFlag: props.alertMessageFlag,
      isErrorMessage: props.isErrorMessage,
    });
  };

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  showMessageBarAtTheBottom
};

export default UtilitiesMethods;
