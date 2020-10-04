import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
// import { Switch } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  //user from data layer
  const[{user}, dispatch]=useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      {!user?(
     <Login/>
      ):(
        <div className="app__body">

  <Router>  

  <Sidebar/>
  <Switch>
  
{/* when the url is rooms/xyz then it renders both sidebar and chat */}
    <Route path="/rooms/:roomId"> 
    {/* Sidebar on the left hand side */}
    
      <Chat/>
      
      </Route>

{/* when the url is nothing then it renders only sidebar */}
      <Route path="/"> 

      {/* render the chat regardless */}
      <Chat/>
      </Route>
      
  </Switch>


  </Router>  
      {/* Chat on the right hand side */}
    </div>

      )}
    
    
    
    
    </div>
  );
}

export default App;
