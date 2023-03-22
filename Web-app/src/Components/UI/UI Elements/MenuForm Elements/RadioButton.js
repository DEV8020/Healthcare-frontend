import classes from "./RadioButton.module.css"

const RadioButton = (props) => {
    return (
        <div className={classes.containerOuter}>
            <label className={classes.gender} for="check">{props.heading}</label>
          <div className={classes.container}>
            <input type="radio" className={classes.hidden} id="input1" name="inputs" onChange={props.onChange}/>
            <label className={classes.entry} for="input1"><div className={classes.circle}></div><div className={classes.entrylabel}>{props.label1}</div></label>
            <input type="radio" className={classes.hidden} id="input2" name="inputs" onChange={props.onChange} />
            <label className={classes.entry} for="input2"><div className={classes.circle}></div><div className={classes.entrylabel}>{props.label2}</div></label>
            <input type="radio" className={classes.hidden} id="input3" name="inputs" onChange={props.onChange} />
            <label className={classes.entry} for="input3"><div className={classes.circle}></div><div className={classes.entrylabel}>{props.label3}</div></label>
            <div className={classes.highlight}></div>
            </div>
            </div>
        
    );
  };
  export default RadioButton;