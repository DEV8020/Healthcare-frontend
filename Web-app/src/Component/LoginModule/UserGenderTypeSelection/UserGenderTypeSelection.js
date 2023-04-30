import classes from "./UserGenderTypeSelection.module.css";

const UserGenderTypeSelection = (props) => {
  const userTypeOptions = props.options;
  return (
    <select id="userType" className={classes.genderselect} onChange={props.onChange}>
      {/* <option value="" className={classes.option}>
        {props.label}
      </option> */}

      {userTypeOptions.map((options) => {
        return (
          <option
            key={options.option}
            value={options.option}
            className={classes.genderoption}
          >
            {options.option}
          </option>
        );
      })}
    </select>
  );
};
export default UserGenderTypeSelection;
