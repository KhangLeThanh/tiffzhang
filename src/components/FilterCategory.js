import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { filterChange } from "../reducers/filterCategory";
const useStyles = makeStyles((theme) => ({
  selectForm: {
    backgroundColor: "#643480 !important",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    fontFamily:
      '"Source Sans Pro", Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
    fontSize: "1em",
  },
}));
const FilterCategory = (props) => {
  const events = useSelector((state) => state.events);
  const filterEvent = useSelector((state) => state.category);

  const classes = useStyles();

  // removing duplicated category from events
  let valueCategory = events.map(function (item) {
    return item.category[1];
  });
  let array_category = _.uniqBy(valueCategory, "title");
  const handleChange = (e) => {
    props.filterChange(e.target.value);
  };

  return (
    <div>
      <select
        className={classes.selectForm}
        defaultValue={filterEvent}
        onChange={handleChange}
      >
        <option value="All">Category</option>

        {array_category.map((item) => (
          <option key={item.id} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
};
export default connect(null, mapDispatchToProps)(FilterCategory);
