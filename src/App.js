import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"
import './App.css';
import { intializeEvent } from './reducers/eventReducer'
import { useDispatch, useSelector} from 'react-redux'
import Event from './components/Event'
import Events from './components/Events'
import Profile from './components/Profile'
import Navigation from './components/Navigation'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.intializeEvent() 
  },[dispatch, props]) 
  const events = useSelector(state=>state.events) 
  const match = useRouteMatch('/events/:id')
  const event = match 
    ? events.find(event => event.eid === Number(match.params.id))
    : null
  return (
    <div>     
        <Navigation/>
        <Switch>
          <Route path="/events/:id">
            <Event event={event}/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/">
            <Events events={events}/>
          </Route>
          
        </Switch>
      
    </div>
  );
}

const mapDispatchToProps = {
  intializeEvent,
}
export default connect(
  null,
  mapDispatchToProps
)(App)