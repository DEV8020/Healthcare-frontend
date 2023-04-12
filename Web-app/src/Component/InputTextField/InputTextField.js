import classes from "./InputTextField.module.css";


const InputTextField = (props) => {

  const inputTextFieldDataChangeHandler = (event) => {
    props.onChange({[props.mappedKey] : event.target.value});
  };

  return (
    <div className={classes.txt_field}>
      <input
        type="text"
        value={props.value}
        onChange={inputTextFieldDataChangeHandler}
        required
      />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputTextField;
