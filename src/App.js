import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import MainScreen from './components/mainscreen';
import ItemList from './components/itemList';

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Online Fashion Store
          </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/" exact static component={MainScreen} />
          <Route path="/itemList/:id/:name" exact static component={ItemList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
