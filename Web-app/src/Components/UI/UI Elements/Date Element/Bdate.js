import classes from "./Bdate.module.css";

const Bdate = (props) => {
  return (
    <div className={classes.bdate}>
      
      <input type="date" name="dateofbirth" id="dateofbirth" />
      <label for="dateofbirth">Date Of Birth</label>
    </div>
  );
};
export default Bdate;
