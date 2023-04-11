import { useEffect, useState } from "react";
import classes from "./InputTextField.module.css";

const InputTextField = (props) => {
  // const [onInputFieldDataChangeHandler, setOnInputFieldDataChangeHandler] =
    useState(null);
  const [inputTextFieldMappedKey, setInputTextFieldMappedKey] = useState("");

  //Assigning the Input Field Data Change Handler to our props...
  useEffect(() => {
    //Assigning the Data Change Handler...
    // setOnInputFieldDataChangeHandler(props.onChange);
    //Assigning the Mapped key which is mapped with the key to be sent to server...
    // setInputTextFieldMappedKey(props.mappedKey);
  }, []);

  // console.log("props data : " + props);

  const inputTextFieldDataChangeHandler = (event) => {
    props.onChange({[props.mappedKey] : event.target.value});
  };
  
  // console.log("inputTextFieldMappedKey value is : " + inputTextFieldMappedKey);

  return (
    <div className={classes.txt_field}>
      <input
        type={props.type}
        value={props.value}
        onChange={inputTextFieldDataChangeHandler}
        required
      />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputTextField;
