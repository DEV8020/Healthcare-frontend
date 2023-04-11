import classes from "./UserNameInput.module.css";

const UsernameInput = (props) => {
  return (
    <div className={classes.txt_field}>
      <input type={props.type} value={props.value} onChange={props.onChange} required />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default UsernameInput;
