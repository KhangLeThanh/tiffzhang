import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },

  title: {
    fontFamily: "Tahoma, Geneva, Cardo, Impact, Nobile",
    textTransform: "none",
    letterSpacing: "1.3px",
    fontSize: "1.7em",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      float: "left",
    },
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
  },
  wrapperMenuLink: {
    zIndex: "999",
  },
  menuLink: {
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
    paddingLeft: "0px",
    marginBottom: "0px",
    marginTop: "0px",
    "& li": {
      display: "inline-block",
      position: "relative",
      margin: "0px 10px",
      fontFamily: " Sans Pro, Oswald, Josefin Sans, Verdana, Lucida Grande",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.2)",
      },
      "& a": {
        color: "#fff",
        height: "100%",
        margin: "0px",
        lineHeight: "42px",
        fontSize: "1em",
        letterSpacing: "0.1px",
        fontWeight: "normal",
        textDecoration: "none",
      },
    },
  },
}));
const Navigation = () => {
  const [navbar, setNavbar] = useState("navbar");

  const classes = useStyles();

  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setNavbar("navbar");
    } else if (window.scrollY > 70) {
      return setNavbar("navbar2");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={navbar}>
      <div className="inner">
        <Link to="/" className={classes.logoLink}>
          <Typography variant="h6" className={classes.title}>
            <span
              className="fa fa-bolt"
              aria-hidden="true"
              style={{ fontSize: "25px" }}
            />
            Paperstr
          </Typography>
        </Link>
        <div className={classes.wrapperMenuLink}>
          <ul className={classes.menuLink}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Our Team</Link>
            </li>
            <li>
              <Link to="/">Try Now</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
