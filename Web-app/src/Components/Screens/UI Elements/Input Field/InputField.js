import classes from "./InputField.module.css";

const InputField = (props) => {
  
  let isRequiredField = false;

  if (props.isRequired != null) {
    isRequiredField = props.isRequired;
  }

  return (
  
  
    <input
      className={classes.input}
      placeholder={props.placeHolder}
      type={props.type}
      required={isRequiredField}
      onChange={props.onChange}
    />
  
  );
};

export default InputField;
