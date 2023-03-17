import classes from './ForgotPasswordButton.module.css'
 
const ForgotPasswordButton=(props)=>{
return(
    <div className={classes.pass}>{props.value}</div>
);
}

export default ForgotPasswordButton;