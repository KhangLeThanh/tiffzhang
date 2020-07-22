import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Divider,
    Button
  } from '@material-ui/core';
import moment from 'moment'
import FilterChange from '../components/FilterChange'
import FavouriteEvent from '../components/FavouriteEvent'
import EventCard from '../components/EventCard'
import { addEvent, removedEvent } from '../reducers/favouriteReducer'

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
        backgroundImage:'url(http://tiffzhang.com/startup/img/bg/69.jpg)',
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
   
    button:{
        backgroundColor:'rgb(60, 12, 88)',
        color:'#fff',
        fontFamily:' Sans Pro, Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
        textTransform:'none',
        '&:hover':{
            backgroundColor:'rgba(60, 12, 88,0.8)',
        },

        '&:disabled' :{
            color: '#fff',
            backgroundColor:'rgba(60, 12, 88,0.4)',

        }
    }
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
       
    // getting current month
    let current_date = new Date();
    let current_month = ((current_date.getMonth() + 1) < 10 ? '0' : '') + (current_date.getMonth() + 1);
    const [count, setCount] = useState(parseInt(current_month));
 
    const handleNext = ()=>{
        count > 12 ? setCount(1) : setCount(count => count + 1);
    }
    const handlePrev = ()=>{
        count > 12 ? setCount(1) : setCount(count => count - 1);     
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
                            <FilterChange/>
                        </Grid> 
                        {group_event.length &&
                            <Grid item xs={6} sm={4} md={4} style={{textAlign:'right'}}>
                                <Button  className={classes.button} style={{marginRight:'5px'}}disabled ={group_event[0].month == count ? true : undefined} onClick={() => handlePrev()}> Prev </Button>
                                <Button  className={classes.button} disabled ={group_event[group_event.length - 1].month == count ? true : undefined} onClick={() => handleNext()}> Next</Button>
                            </Grid>   
                        }
                        <Grid item xs={12} sm={12} md={12}>
                            {group_event.length > 0 ?
                            <div className={classes.listSection}>   
                                <div className={classes.list}>
                                    {getStore.filter ==='All' ?
                                        group_event.map(event =>
                                            event.month == count &&
                                                event.data.map(item=>
                                                    <div key={item.eid}>
                                                        <EventCard event={item}/>   
                                                    </div>
                                                )
                                    )       
                                    :
                                        group_event.map(event =>
                                            event.month == count &&
                                                event.data
                                                .filter(
                                                    (item) =>
                                                    item.category[1].title === getStore.filter 
                                                )    
                                                .map(item=>
                                                    <div key={item.eid}>
                                                        <EventCard event={item}/>
                                                    </div>
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