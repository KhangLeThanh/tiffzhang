import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import './App.css';
import { intializeEvent } from './reducers/eventReducer'
import { useDispatch } from 'react-redux'
import Event from './components/Event'
import Events from './components/Events'
import Profile from './components/Profile'
import Navigation from './components/Navigation'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.intializeEvent() 
  },[dispatch]) 
  
  return (
    <div>     
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/events/:id">
            <Event/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/">
            <Events/>
          </Route>
          
        </Switch>
      </Router>
      
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