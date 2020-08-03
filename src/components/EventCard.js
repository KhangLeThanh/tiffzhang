import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions,
  Avatar,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import EventIcon from "@material-ui/icons/Event";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { removedEvent, addEvent } from "../reducers/favouriteReducer";
import _ from "lodash";

import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    margin: 10,
    backgroundColor: "#fff",
    boxShadow:
      "0px 2px 5px 3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  avatar: {
    backgroundColor: "#92c377",
  },
  linkCard: {
    textDecoration: "none",
    "& p": {
      color: "#000",
    },
  },
  cardContent: {
    fontFamily: "Georgia, serif",

    "& p": {
      fontWeight: "400",
      fontFamily: "Georgia, serif",
      marginBottom: "1em",
    },
    "& a": {
      color: "rgb(100, 52, 128)",
    },
  },
  iconContent: {
    verticalAlign: "bottom",
    fontSize: "1.3em",
    marginRight: "2px",
  },
  iconStar: {
    color: "rgb(100, 52, 128)",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
const EventCard = (props) => {
  const favourite_event = useSelector((state) => state.favourite);
  const classes = useStyles();
  const handleAdd = (data) => {
    props.addEvent(data);
  };
  const handleRemove = (data) => {
    props.removedEvent(data);
  };
  return (
    <Card key={props.event.eid} className={classes.card}>
      <CardActions>
        <CardHeader
          style={{ width: "100%" }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.event.name[props.event.language].charAt(0)}
            </Avatar>
          }
          action={
            !_.some(favourite_event, props.event) ? (
              <StarBorderIcon
                className={classes.iconStar}
                onClick={() => handleAdd(props.event)}
              />
            ) : (
              <StarIcon
                className={classes.iconStar}
                onClick={() => handleRemove(props.event)}
              />
            )
          }
        />
      </CardActions>
      <Link to={`/events/${props.event.eid}`} className={classes.linkCard}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography variant="body1">
              <CategoryIcon className={classes.iconContent} />
              Category: {props.event.category[1].title}
            </Typography>
            <Typography variant="body1">
              <EventIcon className={classes.iconContent} />
              Event:{props.event.name[props.event.language]}
            </Typography>
            <Typography variant="body1">
              <AlarmOnIcon className={classes.iconContent} />
              Time:{" "}
              {moment(props.event.start_time_utc * 1000).format(
                "DD/MM/YYYY"
              )} -{" "}
              {moment(props.event.end_time_utc * 1000).format("DD/MM/YYYY")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const mapDispatchToProps = {
  removedEvent,
  addEvent,
};
export default connect(null, mapDispatchToProps)(EventCard);
