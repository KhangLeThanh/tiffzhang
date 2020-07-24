import React from 'react'
import { useSelector } from 'react-redux'

import { connect } from 'react-redux' 
import { makeStyles } from '@material-ui/core/styles';

import { monthChange } from '../reducers/filterMonth'
const useStyles = makeStyles((theme) => ({
    selectForm:{
        backgroundColor:'#643480 !important' ,
        padding:'5px 10px',
        color:'#fff',
        borderRadius:'5px',
        fontFamily:'"Source Sans Pro", Oswald, "Josefin Sans", Verdana, "Lucida Grande"',
        fontSize:'1em'
    }
}))
const FilterMonth = (props) => {
  
    const filterMonth = useSelector(state=>state.month) 

    const classes = useStyles();

    const handleChange = (e) =>{
        props.monthChange(e.target.value);
    }
    console.log(props)
    
    return(
        <div>      
               
            <select className={classes.selectForm} defaultValue={filterMonth} onChange={handleChange}>
                <option  value='' disabled>Month</option>                                             

                {props.group.map(item =>                            
                    <option key={item.group} value={item.month}>{item.month}</option>                                             
                )}
            </select>
            
        </div>
           
    )
}


const mapDispatchToProps = {
    monthChange,
  }
  export default connect(
    null,
    mapDispatchToProps
  )(FilterMonth)