
const showMessageScreen = (props) => {

    // MessageComponent.showMessageScreen({
    //     message: { message: "Invalid Credentials.", isTrueFlag: true },
    //     alertMessageElement : props.setAlertMessage,
    //     alertMessageFlag : props.setAlertFlag,
    //     isErrorMessage : true
    //   });
    console.log("Called In showMessageScreen");
     props.alertMessageElement(props.message.message);
     props.alertMessageFlag(props.message.isTrueFlag);
};


const MessageComponent = {
  showMessageScreen,
};
export default MessageComponent;
