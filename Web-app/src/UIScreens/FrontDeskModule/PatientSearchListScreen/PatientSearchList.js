import classes from "../PatientDetailsScreen/PatientDetailsView.module.css";
import React, { useEffect, useState } from "react";
// import AddButton from "../../../Components/Screens/UI Elements/MenuForm Elements/addButton";
import FrontDeskAPIHandler from "../../../Controllers/FrontDeskAPIHandler";
import FrontDeskUtilitiesMethods from "../../../Utilities/FrontDeskUtilitiesKeys/FrontDeskUtilitiesMethods";
import SingleDataDetailView from "../../GenericModule/UserDetailsScreen/SingleDataDetailView";
// // import UtilitiesMethods from "../../../Utilities/UtilitiesMethods";
// // import ListDetailView from "../../GenericModule/UserDetailsScreen/ListDetailView";
// import SingleDataDetailView from "../../GenericModule/UserDetailsScreen/SingleDataDetailView";
// import FrontDeskUtilitiesMethods from "../FrontDeskUtilitiesKeys/FrontDeskUtilitiesMethods";

const PatientSearchList = (props) => {
  const [searchPatientList, setSearchPatientList] = useState([]);

  console.log(props.isSearchViewEnabled);
  console.log(props.patientNameToSearch);

  useEffect(() => {
    FrontDeskAPIHandler.GetSearchPatientListByNameData({
      searchString: props.patientNameToSearch,
      getPatientSearchByNameResponseHandler:
        getPatientSearchByNameResponseHandler,
    });
  }, []);

  const getPatientSearchByNameResponseHandler = (patientsListResponseData) => {
    console.log("getPatientSearchByNameResponseHandler");
    console.log(patientsListResponseData.isPatientListRecievedSuccessFully);
    console.log(patientsListResponseData.patientsListData);
    console.log(patientsListResponseData.errorMessage);

    if (patientsListResponseData.isPatientListRecievedSuccessFully === false) {
    }
    setSearchPatientList(patientsListResponseData.patientsListData);
    //setSearchPatientList("patientsListResponseData.patientsListData");
    // console.log("Printing");
    // console.log(searchPatientList);
  };

  //   isPatientListRecievedSuccessFully: true,
  //   patientsListData: getPatientsListServiceData.responseData.data,
  //   errorMessage: null,

  //   {
  //     "patientId": 2,
  //     "name": "dhruv",
  //     "address": "eee2e",
  //     "pincode": 201009,
  //     "age": 0,
  //     "sex": "male",
  //     "contact": "9015346166",
  //     "fieldWorker": null,
  //     "dob": "2023-03-27"
  // }

  console.log("Printing");
  console.log(searchPatientList);




  return (
    <div className={classes.center}>
      <h2> Patient List</h2>

      {searchPatientList.length === 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>
            No patients to display with this name.
          </h3>
        </div>
      )}

      <div className={classes.ul}>
        {searchPatientList.map((userData) => (
          <div key={userData.authId} className={classes.plist}>

          <SingleDataDetailView
            detailData={FrontDeskUtilitiesMethods.processSearchPatientDataToDisplay(
                userData
            )}
          />


            {/* Div to display User ID Key... */}
            {/* <div>
              User ID :{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userIdKey
                ]
              }
            </div> */}

            {/* Div to display User Name Key... */}
            {/* <div>
              User Name:{" "}
              {
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userNameKey
                ]
              }
            </div> */}

            {/* Div to display User Role Key... */}
            {/* <div>
              User Type :{" "}
              {SuperAdminUtilitiesKeys.getUserType(
                userData[
                  SuperAdminUtilitiesKeys.getCreateUserDataKeys().userRoleKey
                ]
              )}
            </div> */}
          </div>
        ))}
      </div>
      
    </div>
  );


  
};

export default PatientSearchList;
