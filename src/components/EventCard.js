import React from 'react'
import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment'
import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
  } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import EventIcon from '@material-ui/icons/Event';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {  removedEvent, addEvent } from '../reducers/favouriteReducer'
import _ from 'lodash';

import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
    card: {
        width: 300,
        margin: 10,
        backgroundColor: 'rgb(100, 52, 128)',
    },
    avatar: {
        backgroundColor: '#92c377',
    },
    cardContent:{
        fontFamily:'Georgia, serif',

        "& p":{
            fontWeight:'400',
            fontFamily:'Georgia, serif',
            marginBottom:'1em',
           
        },   
        "& a":{
            color:'#fff'
        }
    },
    iconContent:{
        verticalAlign:'bottom',
        fontSize:'1.3em',
        marginRight:'2px'
    },
    iconStar:{
        color:'#fff',
        "&:hover":{
            cursor:'pointer'
        }
    }
}))
const EventCard = (props) => {
    const favourite_event = useSelector(state=>state.favourite) 
    const classes = useStyles();
    const handleAdd = (data)=>{ 
        props.addEvent(data)
    }
    const handleRemove = (data)=>{
        props.removedEvent(data)

    }
  return(
    <div>
        <Card key={props.event.eid} className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                    {props.event.name[props.event.language].charAt(0)}
                    </Avatar>
                }
                action={
                    !_.some(favourite_event, props.event) ?
                        <StarBorderIcon className={classes.iconStar} onClick={() => handleAdd(props.event)}/>
                    :
                        <StarIcon className={classes.iconStar} onClick={() => handleRemove(props.event)}/>      
                }
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body1" style={{color:'#fff'}}>
                    <CategoryIcon className={classes.iconContent}/> {props.event.category[1].title}        
                </Typography>
                <Typography variant="body1" style={{color:'#fff'}}>
                    <EventIcon className={classes.iconContent}/> <a href={`/events/${props.event.eid}`}>{props.event.name[props.event.language]}</a>
                </Typography>
                <Typography variant="body1" style={{color:'#fff'}}>
                    <AlarmOnIcon className={classes.iconContent}/> { moment(props.event.start_time_utc* 1000).format("DD/MM/YYYY") }
                </Typography>
                
            </CardContent>       
        </Card>
    </div>
  )
}

const mapDispatchToProps = {
    removedEvent, addEvent
}
export default connect(
  null,
  mapDispatchToProps
)(EventCard)