import classes from "./ForgotPasswordButton.module.css";

const ForgotPasswordButton = (props) => {
  return (
    <button className={classes.pass} onClick={props.onClickHandler}>
      {props.value}
    </button>
  );
};

export default ForgotPasswordButton;
