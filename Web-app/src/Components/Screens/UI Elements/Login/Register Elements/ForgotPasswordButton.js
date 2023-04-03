import classes from './ForgotPasswordButton.module.css'
 
const ForgotPasswordButton=(props)=>{
return(
    <div className={classes.pass} onClick={props.onClickHandler}>{props.value}</div>
);
}

export default ForgotPasswordButton;