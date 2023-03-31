import classes from "./ShowAllUser.module.css"

import React, { useState } from "react";

// import NewEncounterService from "../../../Services/FieldWorkerListService";



const ShowAllUser = (props) => {
  const UserList = [
    {
      
      d_id:"d1",
      userType:"Doctor",
      userID:"1",
      Password:"2"
      
    },
    {
      d_id: "d2",
      userType:"Admin",
      userID:"1",
      Password:"2"
    },
    {
  
      d_id:"d3",
      userType:"Supervisor",
      userID:"1",
      Password:"2"
    },
    {
  
        d_id:"d4",
        userType:"Front Desk",
      userID:"1",
      Password:"2"
      },
  ];
  

  return (
    <div className={classes.center}>
      <h2> Patient History</h2>
      <div className={classes.ul}>
        {UserList.map((userlist) => (
          <div key={userlist.d_id} className={classes.plist}>
            <div>User Type : {userlist.userType}</div>
            <div>User Name: {userlist.userID}</div>
        <div>Password : {userlist.Password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllUser;
