import classes from "./AdminScreen.module.css";
import Button from "../UI Elements/Button/Button";
import AddHospital from "./AddHospital";
import AddDoctor from "./AddDoctor"
import AddFrontDesk from "./AddFrontDesk"
import { useState } from "react";
import NavBar from "../UI Elements/NavBar/NavBar";

const AdminScreen = (props) => {
 
  const [adminOption,setAdminOption] = useState("admin");

  const AddHospitalButtonHandler = () => {
    setAdminOption("addHospital");
  };
  const AddDoctorButtonHandler = () => {
    setAdminOption("addDoctor");
  };
  const AddFrontDeskButtonHandler = () => {
    setAdminOption("addFrontDesk");
  };
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    props.setUser(null);
  };
  if (!props.user) return null;
  return(
    <div>
      <NavBar value="Log-out" label="Admin" onClick={logout}/>
      
      <div className={classes.center}>
        <h2> Admin Menu</h2>

        <div className={classes.Admin_menu}>
          <Button value="Hospital Registration" onClick={AddHospitalButtonHandler} />

          <Button value="Doctor Registration" onClick={AddDoctorButtonHandler} />

          <Button value="FrontDesk Registration" onClick={AddFrontDeskButtonHandler} />
        </div>
      </div>

      {
      adminOption === "addHospital" && (<AddHospital adminOption={adminOption} setAdminOption={setAdminOption} />)
    }
    {
      adminOption === "addDoctor" && (<AddDoctor adminOption={adminOption} setAdminOption={setAdminOption}/>)
    }
    {
      adminOption === "addFrontDesk" && (<AddFrontDesk adminOption={adminOption} setAdminOption={setAdminOption} />)
    }

    </div> 
);}

export default AdminScreen;
