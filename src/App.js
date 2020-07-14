import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Join from './common/JoinScreen/Join';
import ChatMain from "./components/ChatMain";

function App() {
  
  return (
    <Router>
    <Switch>
        <Route exact path="/" component={Join}/>
        <Route path="/chat" component={ChatMain}/>
      </Switch>
    </Router>
    
  );
}

export default App;
