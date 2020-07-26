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
    CardActionArea,
    CardActions,
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
        backgroundColor: '#fff',
        boxShadow:'0px 2px 5px 3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },
    avatar: {
        backgroundColor: '#92c377',
    },
    linkCard:{
        textDecoration:'none',
        "& p":{
            color:'#000'
        }
    },
    cardContent:{
        fontFamily:'Georgia, serif',

        "& p":{
            fontWeight:'400',
            fontFamily:'Georgia, serif',
            marginBottom:'1em',
           
        },   
        "& a":{
            color:'rgb(100, 52, 128)'
        }
    },
    iconContent:{
        verticalAlign:'bottom',
        fontSize:'1.3em',
        marginRight:'2px'
    },
    iconStar:{
        color:'rgb(100, 52, 128)',
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
                favourite_event
                    .sort((a, b) => new Date(a.start_time_utc) - new Date(b.start_time_utc))    
                    .map(item =>
                        <Card key={item.eid} className={classes.card}>
                            <CardActions>
                                <CardHeader
                                    style={{width:'100%'}}
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            {item.name[item.language].charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <StarIcon className={classes.iconStar} onClick={() => handleRemove(item)}/>
                                    }
                                />
                            </CardActions>
                            <Link to={`/events/${item.eid}`} className={classes.linkCard}>
                                <CardActionArea>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="body1">
                                            <CategoryIcon className={classes.iconContent}/>Category: {item.category[1].title}        
                                        </Typography>
                                        <Typography variant="body1">
                                            <EventIcon className={classes.iconContent}/>Event: {item.name[item.language]}
                                        </Typography>
                                        <Typography variant="body1">
                                            <AlarmOnIcon className={classes.iconContent}/>Time: { moment(item.start_time_utc* 1000).format("DD/MM/YYYY") } - { moment(item.end_time_utc* 1000).format("DD/MM/YYYY") }
                                        </Typography>                        
                                    </CardContent>  
                                </CardActionArea>    
                            </Link>     
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