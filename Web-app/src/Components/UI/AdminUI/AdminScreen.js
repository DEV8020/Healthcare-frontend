import classes from "./AdminScreen.module.css";
import Button from "../UI Elements/Button/Button";
import AddHospital from "./AddHospital";
import AddDoctor from "./AddDoctor"
import AddFrontDesk from "./AddFrontDesk"
import { useState } from "react";

const AdminScreen = (props) => {
 
  const [adminOption,setAdminOption] = useState("admin");

  const AddHospitalButtonHandler = () => {
    setAdminOption("addHospital");
  };
  const AddDoctorButtonHandler = () => {
    setAdminOption("addHospital");
  };
  const AddFrontDeskButtonHandler = () => {
    setAdminOption("addHospital");
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;
  return(<>
    {
      adminOption === "addHospital" && (<AddHospital adminOption={adminOption} setAdminOption={setAdminOption} />)
    }
    {
      adminOption === "addDocter" && (<AddDoctor adminOption={adminOption} setAdminOption={setAdminOption}/>)
    }
    {
      adminOption === "addFrontDesk" && (<AddFrontDesk adminOption={adminOption} setAdminOption={setAdminOption} />)
    }
    { adminOption === "admin" && (
    <div>
      <h1 className={classes.head}>Admin</h1>
      <div className={classes.NavBar}>
        <button value="logout" className={classes.logout_btn} onClick={logout}>
          log-out
        </button>
      </div>
      <div className={classes.center}>
        <h1> Admin Menu</h1>

        <div className={classes.Admin_menu}>
          <Button value="Add Hospital" onClick={AddHospitalButtonHandler} />

          <Button value="Add Doctor" onClick={AddDoctorButtonHandler} />

          <Button value="Add FrontDesk" onClick={AddFrontDeskButtonHandler} />
        </div>
      </div>
    </div> )
  }
  </>);}

export default AdminScreen;
