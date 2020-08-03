import React from "react";
import FavouriteEvent from "../components/FavouriteEvent";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import banner from "../banner.jpg";
import avatar from "../avatar.png";

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: 1000,
    margin: "0 auto",
    position: "relative",
    zIndex: "9",
  },
  sectionBanner: {
    backgroundImage: `url(${banner})`,
    height: "350px;",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    "&:before": {
      content: "close-quote",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "block",
      backgroundColor: "rgba(0,0,0,.55)",
    },
    "& h2": {
      fontFamily:
        ' Sans Pro , Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
      fontSize: "35px",
      position: "absolute",
      zIndex: "9",
      paddingTop: "0.5em",
      paddingBottom: "0.5em",
      textAlign: "center",
      top: "75%",
      left: "50%",
      transform: "translate(-50%,-75%)",
      marginBottom: "0px",
    },
  },
  profileImage: {
    position: "absolute",
    zIndex: "9",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    marginBottom: "0px",
  },
  small: {
    width: "4em",
    height: "4em",
  },
  sectionFavourite: {
    "& h3": {
      fontFamily: 'Sans Pro, Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
      fontSize: "30px",
    },
    "& h5": {
      fontFamily: 'Sans Pro, Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
      fontSize: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  },
}));
const Profile = () => {
  const classes = useStyles();

  return (
    <div>
      <section className={classes.sectionBanner}>
        <div className={classes.profileImage}>
          <Avatar alt="Penny" src={avatar} className={classes.small} />
        </div>
        <Typography variant="h2" style={{ color: "#fff" }}>
          Penny
        </Typography>
      </section>
      <section
        className={classes.sectionFavourite}
        style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
      >
        <div className={classes.grid}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h3">My favourite event:</Typography>
              <FavouriteEvent />
            </Grid>
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default Profile;
