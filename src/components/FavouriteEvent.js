import React from 'react'
import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';
import {
    Link
  } from "react-router-dom"
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
import {  removedEvent } from '../reducers/favouriteReducer'

import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
    listSection: {
        paddingTop: '10px',       
        clear:'both'
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '0 auto',
    },
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
const FavouriteEvent = (props) => {
    const favourite_event = useSelector(state=>state.favourite) 
    const classes = useStyles();
    const handleRemove = (data)=>{
        props.removedEvent(data)

    }
  

  return(
    <div className={classes.listSection}>
        <div className={classes.list}>
        {favourite_event.length > 0 ?
            favourite_event.map(item =>
                <Card key={item.eid} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {item.name[item.language].charAt(0)}
                            </Avatar>
                        }
                        action={
                            <StarIcon className={classes.iconStar} onClick={() => handleRemove(item)}/>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" style={{color:'#fff'}}>
                            <CategoryIcon className={classes.iconContent}/> {item.category[1].title}        
                        </Typography>
                        <Typography variant="body1" style={{color:'#fff'}}>
                            <EventIcon className={classes.iconContent}/> <Link to={`/events/${item.eid}`}>{item.name[item.language]}</Link>
                        </Typography>
                        <Typography variant="body1" style={{color:'#fff'}}>
                            <AlarmOnIcon className={classes.iconContent}/> { moment(item.start_time_utc* 1000).format("DD/MM/YYYY") }
                        </Typography>      
        
                    </CardContent>                            
                </Card>
            )
        :
        <Typography variant="h5">
            Empty List
        </Typography>
        }
        </div>
    </div>
  )
}

const mapDispatchToProps = {
    removedEvent
}
export default connect(
  null,
  mapDispatchToProps
)(FavouriteEvent)