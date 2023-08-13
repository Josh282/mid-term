import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import VideoDetailPage from './components/VideoDetailPage';
import ErrorPage from './components/ErrorPage';
import { SearchProvider } from './components/SearchContext';
import SearchResultPage from './components/SearchResultPage';

function App() {
  return(
    <SearchProvider>
      <Router>
        <Switch>
          <Route path='/' exact component ={HomePage} />
          <Route path='/videos/:videoId' component={VideoDetailPage} />
          <Route path='/error' component={ErrorPage} />
          <Route path='/search' component={SearchResultPage} />
        </Switch>
      </Router>
    </SearchProvider>
  );
}

export default App;