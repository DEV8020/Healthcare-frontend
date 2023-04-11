import classes from "./submitButton.module.css";

const SubmitButton = (props) => {
  return (
    <input
      type="submit"
      className={classes.submit}
      onClick={props.onClick}
      form={props.form}
      value={props.value}
    />
  );
};

export default SubmitButton;
