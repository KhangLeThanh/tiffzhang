import React from 'react'
import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Grid
  } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LinkIcon from '@material-ui/icons/Link';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import banner from '../banner.jpg'

import { addEvent, removedEvent } from '../reducers/favouriteReducer'

import { useSelector } from 'react-redux'
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
    grid: {
        maxWidth: 1000,
        margin: '0 auto',
        position:'relative',
        zIndex:'9',
        textAlign:'center'
      },
    sectionBanner:{
        backgroundImage:`url(${banner})`,
        paddingTop:'10em',
        paddingBottom:'10em',
        backgroundPosition:'center center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        backgroundAttachment:'fixed',
        position:'relative',
        "&:before":{
            content:'close-quote',
            position: 'absolute',
            top:'0',
            left:'0',
            width:'100%',
            height:'100%',
            display: 'block',
            backgroundColor: 'rgba(0,0,0,.55)',
        }
    },
    wrapperEvent:{
        position:'absolute',
        zIndex:'9',
        paddingTop:'0.5em',
        paddingBottom:'0.5em',
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.05)',
        width:'100%',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        marginBottom:'0px'
    },
    card: {
        margin: 10,
        backgroundColor: '#fff',
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
            fontSize:'2em',
            wordBreak:'break-word',
            [theme.breakpoints.down('sm')]: {
                fontSize:'1.8em',

            },
            [theme.breakpoints.down('xs')]: {
                fontSize:'1.5em',

            }
        },   
        "& a":{
            color:'rgb(100, 52, 128)'
        }
    },
    iconContent:{
        verticalAlign:'top',
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
const Event = (props) => {

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
        <section className={classes.sectionBanner}>
                <div className={classes.grid}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            {props.event !== undefined ? 
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
                                        <Typography variant="body1">
                                            <HomeIcon className={classes.iconContent}/> Location: {props.event.location[Object.keys(props.event.address)]}        
                                        </Typography>
                                        
                                        <Typography variant="body1">
                                            <LinkIcon className={classes.iconContent}/> Registration link: <a href={props.event.enrollment_url} target="_blank" rel="noopener noreferrer">{props.event.enrollment_url}</a>
                                        </Typography>
                                    
                                        
                                    </CardContent>       
                                </Card>
                                
                            :
                            <Typography variant="h2" style={{color:'#fff'}}>
                                Event Not Found 
                            </Typography>   
                            }              
                        </Grid>  
                    </Grid>
                </div>                
        </section>
        

    </div>
  )
}

const mapDispatchToProps = {
    addEvent,removedEvent
}
export default connect(
  null,
  mapDispatchToProps
)(Event)