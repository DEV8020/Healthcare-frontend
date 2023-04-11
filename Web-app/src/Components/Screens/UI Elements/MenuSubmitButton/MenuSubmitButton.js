import classes from "./MenuSubmitButton.module.css";

const MenuSubmitButton = (props) => {
  return (
    <input
      type="submit"
      className={classes.menu_submit}
      onClick={props.onClick}
      form={props.form}
      value={props.value}
    />
  );
};

export default MenuSubmitButton;