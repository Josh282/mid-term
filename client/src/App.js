import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import VideoDetailPage from './components/VideoDetailPage';

function App() {
  return(
    <Router>
      <Switch>
        <Route path='/' exact component ={HomePage} />
        <Route path='/videos/:videoId' component={VideoDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;