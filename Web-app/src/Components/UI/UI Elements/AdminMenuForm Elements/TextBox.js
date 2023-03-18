import classes from "./TextBox.module.css";

const TextBox = (props) => {
  return (
    <div className={classes.txt_box}>
      <textarea type={props.type} onChange={props.onChange} required />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default TextBox;
