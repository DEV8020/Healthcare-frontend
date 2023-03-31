import classes from "./InputField.module.css";

const InputField = (props) => {
  return (
    <div className={classes.txt_field}>
      <input type={props.type} onChange={props.onChange} required />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputField;
