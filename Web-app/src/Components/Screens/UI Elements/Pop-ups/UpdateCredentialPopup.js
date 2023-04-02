import React, { useState } from 'react';
import classes from './popup.module.css'

const UpdateCredentialPopup = (props) => {
    const[updatedUserId,setUpdatedUserId]=useState("");
    const[updatedUserPassword,setUpdatedUserPassword]=useState("");

    const UpdatedUserIdChangeHandler=(event)=>{
        setUpdatedUserId(event.target.value);
    }
    const UpdatedUserPasswordChangeHandler=(event)=>{
        setUpdatedUserPassword(event.target.value);
    }

   const UpdateCredentialSubmitHandler=(event)=>{
        event.preventDefault();
        const updatedCredentials={
            updatedId:props.d_id,
            updatedUserId:updatedUserId,
            updatedUserPassword:updatedUserPassword,
        }
        props.onUpdate(updatedCredentials);
    }

  return (
    <div className={classes.popup}>
      <div className={classes.popup_content}>
        <h2>   Update  Credentials  </h2>
        <form onSubmit={UpdateCredentialSubmitHandler}>
          <label htmlFor="userID">User ID:</label>
          <input type="text" id="userID" value={updatedUserId} onChange={UpdatedUserIdChangeHandler} />

          <label htmlFor="password">Password:</label>
          <input type="text" id="password" value={updatedUserPassword} onChange={UpdatedUserPasswordChangeHandler}  />

          <input type="submit" value="Update"/>
          <button className={classes.close_btn} onClick={props.onClose}>Close</button>
        </form>
        
      </div>
    </div>
  );
};

export default UpdateCredentialPopup;
