import classes from "./addButton.module.css";

const AddButton = (props) => {
  return (
    <input
      type="button"
      className={classes.add}
      onClick={props.onClick}
      form={props.form}
      value={props.value}
    />
  );
};

export default AddButton;
