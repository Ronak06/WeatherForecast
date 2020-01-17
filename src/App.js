import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import About from "./components/pages/About";
import Form from "./components/Form";
import Header from "./components/layout/Header";
import NotFound from "./components/pages/NotFound";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" render={props => <Form />} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
