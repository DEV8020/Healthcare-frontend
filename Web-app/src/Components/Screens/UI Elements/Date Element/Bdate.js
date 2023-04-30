import classes from "./Bdate.module.css";

const Bdate = (props) => {
  return (
    <div className={classes.bdate}>
      <input
        type="date"
        name="dateofbirth"
        id="dateofbirth"
        onChange={props.onChange}
        value={props.value}
        max={props.maxDate}
        required
      />
      <label>Date Of Birth</label>
    </div>
  );
};
export default Bdate;
