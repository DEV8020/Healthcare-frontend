import classes from "./UserTypeSelection.module.css";

const UserTypeSelection = (props) => {
  const userTypeOptions = props.options;
  return (
    <select id="userType" className={classes.select} onChange={props.onChange}>
      {/* <option value="" className={classes.option}>
        {props.label}
      </option> */}

      {userTypeOptions.map((options) => {
        return (
          <option
            key={options.option}
            value={options.option}
            className={classes.option}
          >
            {options.option}
          </option>
        );
      })}
    </select>
  );
};
export default UserTypeSelection;
