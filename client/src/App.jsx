import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateRoom from './Routes/CreateRoom';
import Room from './Routes/Room';
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
