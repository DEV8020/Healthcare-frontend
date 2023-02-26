import classes from "./Button.module.css";

const Button = (props) => {

return (<button className={classes.button} type={props.type} onClick={props.onClick} form={props.form} value = {props.value}>{props.value}</button>);

}


export default Button;