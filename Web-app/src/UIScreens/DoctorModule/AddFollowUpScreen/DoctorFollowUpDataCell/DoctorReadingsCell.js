import { useState } from "react";
import DoctorUtilitiesKeys from "../../../../Utilities/DoctorUtilities/DoctorUtilitiesKeys";
import classes from "../AddFollowup.module.css";

const DoctorReadingsCell = (props) => {
  //

  console.log(props.readingsData);
  console.log(props.followUpIndex);

  //   for (const [k, v] of Object.entries(props.readingsData)) {
  //     console.log(k, v);
  //   }

  Object.keys(props.readingsData).map((key, index) => {
    console.log(key);
    console.log(props.readingsData[key]);
  });

  const isCheckBoxSelected = (value) => {
    return value === "TRUE";
  };

  const getReadingUpdatedValue = (value) => {
    return value === "TRUE" ? "FALSE" : "TRUE";
  };

  const handleCheckboxChange = (prop) => {
    console.log("handleCheckboxChange");
    console.log(prop);

    const updatedData = {
      ...props.readingsData,
      ...{ [prop.key]: getReadingUpdatedValue(prop.value) },
    };
    console.log(updatedData);
    props.handleDoctorReadingsDataChangeHandler({
      updatedData: updatedData,
      index: props.followUpIndex,
    });
  };

  return (
    <div>
      {Object.keys(props.readingsData).map((key, index) => {
        return (
          <label>
            {key}
            <input
              type="checkbox"
              name={`temperature${index}`}
              checked={isCheckBoxSelected(props.readingsData[key])}
              onChange={(event) =>
                handleCheckboxChange({
                  key: key,
                  value: props.readingsData[key],
                })
              }
            />
          </label>
        );

        {
          /* console.log(key);
    console.log(props.readingsData[key]); */
        }
        {
          /* // return (
    //   <div key={index}>
    //     <div>
    //       {key} : {props.detailData[key]}
    //     </div>
    //   </div>
    // ); */
        }
      })}

      {/* {Object.entries(props.readingsData)((key, value) => {
        console.log(key);
        console.log(value);
      })} */}

      {/* {props.readingsData.map((readingData, index) => {
        <label>
          {readingData}
          <input
            type="checkbox"
            name={`temperature${index}`}
            //checked={followup.checkboxes[0]}
            // onChange={(event) =>
            //   handleCheckboxChange(event.target.checked, 0, index)
            // }
          />
        </label>
      })} */}
    </div>
  );
};

export default DoctorReadingsCell;
