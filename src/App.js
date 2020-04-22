import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import SidePage from './SidePage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  routes = (
      <Switch>
        <Route path="/" exact> <SidePage/> </Route>
        <Route path="/user/dashboard" exact>

        </Route>
        <Route path="/user/edit" exact>

        </Route>
        <Route path="/user/profile" exact>

        </Route>

        <Redirect to="/"/>
      </Switch>
  );

  render() {
    return <Router>
      {/*<MainNavigation / >*/}
      <main>
        {this.routes}
      </main>
    </Router>
  }
}

export default App;
