import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Divider,
  } from '@material-ui/core';
import moment from 'moment'
import FilterCategory from '../components/FilterCategory'
import FilterMonth from '../components/FilterMonth'
import FavouriteEvent from '../components/FavouriteEvent'
import EventCard from '../components/EventCard'
import { addEvent, removedEvent } from '../reducers/favouriteReducer'
import banner from '../banner.jpg'
const useStyles = makeStyles((theme) => ({
    grid: {
        maxWidth: 1000,
        margin: '0 auto',
    },
    gridFilter:{
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            textAlign:'left',

        }
    },
    sectionBanner:{
        backgroundImage:`url(${banner})`,
        height:'350px;',
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
        },
        "& h2":{
            fontFamily:'Sans Pro, Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
            fontSize:'35px',
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
        }
    },
    sectionFavourite:{
        "& h3":{
            fontFamily:'Sans Pro, Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
            fontSize:'30px',
        },
        "& h5":{
            fontFamily:'"Source Sans Pro", Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
            fontSize:'24px',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft:'15px',
            paddingRight:'15px'
        }
    },
    sectionEvents:{
        "& h3":{
            fontFamily:'"Source Sans Pro", Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
            fontSize:'30px',
        },
        "& h5":{
            fontFamily:'"Source Sans Pro", Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
            fontSize:'24px',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft:'15px',
            paddingRight:'15px'
        }
    },

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
    
    
}));

const Events = () => {
   
    const events = useSelector(state=>state.events) 
    const classes = useStyles();
    const getStore = useSelector(state=>state) 
    // grouping event by month
    let groupKey = 0;
    let group_event= [];
    if(events.length > 0){
        let groups = events.reduce((r, event) => {
            let date = moment(event.start_time_utc* 1000).format("YYYY-MM-DD").split(('-'))[1];
            (r[date])? r[date].data.push(event) : r[date] = {group: String(groupKey++), data: [event], month: date};
            return r;
        }, {})

        group_event = Object.keys(groups).map(function(k){ return groups[k]; });

    }
    return(
        <div>
            <section className={classes.sectionBanner}>
                <Typography variant="h2" style={{color:'#fff'}}>
                    Events 
                </Typography>
            </section>
            <section className={classes.sectionFavourite} style={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}>
                <div className={classes.grid}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h3">
                                My favourite event:
                            </Typography>                           
                            <FavouriteEvent/>
                        </Grid>  
                    </Grid>
                </div>      
            </section>
            <div className={classes.grid}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider  style={{backgroundColor:'#000'}}/>
                    </Grid>
                </Grid>
            </div>                        
            <section className={classes.sectionEvents} style={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}>
                <div className={classes.grid}>
                    <Grid container>
                        <Grid item xs={12} sm={4} md={4}>
                            <Typography variant="h3" >
                                Events:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4} className={classes.gridFilter}>    
                            <FilterCategory/>
                        </Grid> 
                        <Grid item xs={6} sm={4} md={4} style={{textAlign:'right'}}>    
                            <FilterMonth group={group_event}/>
                        </Grid> 
                           
                        <Grid item xs={12} sm={12} md={12}>
                            {group_event.length > 0 ?
                            <div className={classes.listSection}>   
                                <div className ={classes.list}>
                                    {getStore.category ==='All' ?
                                        group_event
                                            .map(event =>
                                                event.month === getStore.month 
                                                    &&
                                                   
                                                    event.data
                                                        .sort((a, b) => new Date(b.start_time_utc) - new Date(a.start_time_utc))
                                                        .map(item=>
                                                            <EventCard key={item.eid} event={item}/>   
                                                    )                                                      
                                            
                                    )       
                                    :
                                        group_event.map(event =>
                                            event.month === getStore.month 
                                                &&                                           
                                                event.data
                                                    .filter(
                                                        (item) =>
                                                        item.category[1].title === getStore.category 
                                                    )    
                                                    .sort((a, b) => new Date(b.start_time_utc) - new Date(a.start_time_utc))
                                                    .map(item=>
                                                        <EventCard key={item.eid} event={item}/>
                                                )
                                                                            
                                        )
                                    }
                                    </div>
                                </div>
                            :
                                <Typography variant="h5">
                                   Loading...
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
)(Events)