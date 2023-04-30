import classes from "./AddSmallButton.module.css";

const AddSmallButton = (props) => {
  return (
    <button className={classes.add} onClick={props.onClick} value={props.value}>
      {props.value}
    </button>
  );
};

export default AddSmallButton;