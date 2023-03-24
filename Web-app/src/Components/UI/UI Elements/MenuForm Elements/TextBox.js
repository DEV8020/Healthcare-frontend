import classes from "./TextBox.module.css";

const TextBox = (props) => {
  return (
    <div className={classes.txt_box}>
      <textarea type={props.type} value ={props.value} onChange={props.onChange} required />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};
const TextBox2 = (props) => {
  return (
    <div className={classes.txt_box2}>
      <textarea type={props.type} value ={props.value} onChange={props.onChange} required />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

const TextBoxObj={TextBox,TextBox2};
export default TextBoxObj;
