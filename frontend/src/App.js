import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Route, Link} from "react-router-dom"
import ComposersList from "./ComposersList";
import ComposerCreateUpdate from "./ComposerCreateUpdate";
import './App.css';
import "./hover.css";

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className=" nav navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Music Theory Website</a>
      <button className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarNavAltMarkup" 
                aria-controls="navbarNavAltMarkup" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link hvr-back-pulse" href="/">COMPOSERS</a>
          <a className="nav-item nav-link" href="/composer">CREATE COMPOSER</a>
        </div>
      </div>
    </nav>
    <div className="content">
      <Route path="/" exact component={ComposersList} />
      <Route path="/composers/:pk" component={ComposerCreateUpdate} />
      <Route path="/composer/" exact component={ComposerCreateUpdate} />
    </div>
  </div>
)


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;
