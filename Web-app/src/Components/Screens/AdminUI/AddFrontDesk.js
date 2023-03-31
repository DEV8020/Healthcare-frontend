//----------------------------------------------------------------- Imported files ------------------------------------------------------------------------

import React, { useState } from "react";

//----------------------------------------------------------------- API Service ------------------------------------------------------------------------

import AddFrontDeskService from "../../../Services/AddFrontDeskService";
//----------------------------------------------------------------- UI Elements ------------------------------------------------------------------------

import InputField from "../UI Elements/MenuForm Elements/InputField";
import AddButton from "../UI Elements/MenuForm Elements/addButton";

//----------------------------------------------------------------- CSS File --------------------------------------------------------------------------------

import classes from "./AddOptions.module.css";

//----------------------------------------------------------------- Component Function ------------------------------------------------------------------------

const AddFrontDesk = (props) => {
  //----------------------------------------------------------------- Input Variables ------------------------------------------------------------------------

  const [frontDeskName, setFrontDeskName] = useState("");

  const [frontDeskEmailId, setFrontDeskEmailId] = useState("");

  const [frontDeskContact, setFrontDeskContact] = useState("");

  const [frontDeskPassword, setFrontDeskPassword] = useState("");

  //------------------------------------------------------------ Field Change Handlers ----------------------------------------------------------------
  const frontDeskNameChangeHandler = (event) => {
    setFrontDeskName(event.target.value);
  };
  const frontDeskEmailIdChangeHandler = (event) => {
    setFrontDeskEmailId(event.target.value);
  };
  const frontDeskContactChangeHandler = (event) => {
    setFrontDeskContact(event.target.value);
  };
  const frontDeskPasswordChangeHandler = (event) => {
    setFrontDeskPassword(event.target.value);
  };

  //-----------------------------------------------------------------   API Service Function -----------------------------------------------------------------------

  const AddFrontDeskHandler = async (frontDeskData) => {
    console.log(frontDeskData);

    try {
      AddFrontDeskService(frontDeskData);
    } catch (exception) {
      console.log(exception);
    }
  };

  //----------------------------------------------------------------- Form Submit Handler ------------------------------------------------------------------------

  const AddFrontDeskDataHandler = (event) => {
    event.preventDefault();

    const frontDeskData = {
      frontDesk_name: frontDeskName,
      frontDesk_email_id: frontDeskEmailId,
      frontDesk_contact: frontDeskContact,
      frontDesk_password: frontDeskPassword,
    };

    //----------------------------------------------------------------- Reset Input Fields ------------------------------------------------------------------------

    setFrontDeskName("");
    setFrontDeskEmailId("");
    setFrontDeskContact("");
    setFrontDeskPassword("");

    //----------------------------------------------------------------- API Call ------------------------------------------------------------------------

    AddFrontDeskHandler(frontDeskData);
  };

  //----------------------------------------------------------------- JSX Code ------------------------------------------------------------------------

  return (
    <div>
      <div className={classes.center}>
        <h1> Add FrontDesk Menu</h1>

        <form id="addFD-form" onSubmit={AddFrontDeskDataHandler}>
          <InputField
            type="text"
            label="FrontDesk Name"
            onChange={frontDeskNameChangeHandler}
          />

          <InputField
            type="text"
            label="Contact Number"
            onChange={frontDeskContactChangeHandler}
          />
          <InputField
            type="text"
            label="Email ID"
            onChange={frontDeskEmailIdChangeHandler}
          />

          <InputField
            type="text"
            label="Password"
            onChange={frontDeskPasswordChangeHandler}
          />

          <AddButton value="Register" />
        </form>
      </div>
    </div>
  );
};

export default AddFrontDesk;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
