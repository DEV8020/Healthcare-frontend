//########################## Admin Menu Keys  ##########################

//Admin Menu Create User Options Keys...
const getCreateUserDataKeys = () => {
  return {
    userIDKey: "username",
    userNameKey: "name",
    userPasswordKey: "password",
    userContactKey: "contact",
    userPasswordKey: "password",
    doctorLicenseIDKey: "licId",
    doctorSpecializationKey: "docSpecialization",
  };
};


//Admin Menu Create User Label Keys...
const getCreateUserLabelKeys = () => {
    return {
      doctorNameKey: "Doctor Name",
      doctorLicenseIDKey: "Doctor license ID",
      doctorContactKey: "Contact Number",
      doctorSpecializationKey: "Doctor Specialization",
      doctorUserIDKey: "User Id",
      doctorPasswordKey: "Password",
    //   doctorSpecializationKey: "docSpecialization",
    };
  };


        //   <InputField
        //     type="text"
        //     label="Password"
        //     onChange={doctorPasswordChangeHandler}
        //     value={doctorData.password}
        //   />
        //   <div>
        //     <MenuSubmitButton value="Register" />
        //     <MenuSubmitButton
        //       value="Cancel"
        //       onClick={BackButtonPressedHandler}
        //     />


//Doctor Name

// setDoctorData({
//   // userId: "",
//   // password: "",
//   // name: "",
//   // licId: "",
//   // phoneNum: "",
//   // userId: "",
//   // docSpecialization: "",
// });

//Admin Menu Create User Options Keys...
const getCreateUserInitialData = () => {
  return {
    [getCreateUserDataKeys().userIDKey]: "",
    [getCreateUserDataKeys().userPasswordKey]: "",
    [getCreateUserDataKeys().userNameKey]: "",
    [getCreateUserDataKeys().doctorLicenseIDKey]: "",
    [getCreateUserDataKeys().userContactKey]: "",
    [getCreateUserDataKeys().doctorSpecializationKey]: "",
  };
};

// setDoctorData({

//     phoneNum: "",
//     userId: "",
//     docSpecialization: "",
//   });

// const getSuperAdminErrorMessagesText = () => {
//   return {
//     chooseHospilatIDFromList: "Please choose hospital id from the list.",
//   };
// };


const AdminUtilities = {
  getCreateUserDataKeys,
  getCreateUserInitialData,
  getCreateUserLabelKeys,
  // getSuperAdminErrorMessagesText,
  // getCreateUserDataKeys,
  // getCreateUserInitialData,
  // getUserType
};

export default AdminUtilities;
