import classes from "./SmallInputField.module.css";

const SmallInputField = (props) => {
  return (
    <div className={classes.txt_field}>
        <label>{props.label}</label>
      <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} defaultValue="" required />
    </div>
  );
};

export default SmallInputField;