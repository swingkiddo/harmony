import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Route, Link } from "react-router-dom"
import ComposersList from "./components/composers/ComposersList";
import ComposerCreateUpdate from "./components/composers/ComposerCreateUpdate";
import ComposerDetail from './components/composers/ComposerDetail';
import TextbooksList from './components/TextbooksList';

import './App.css';
import "./hover.css";

const BaseLayout = () => (
  <div className="container-fluid page">
    <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
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
            <a className="nav-item nav-link hvr-back-pulse" href="/composers">Музыкальная литература</a>
            <a className="nav-item nav-link hvr-back-pulse" href="/harmony">Гармония</a>
            <a className="nav-item nav-link hvr-back-pulse" href="/textbooks">Материалы</a>
          </div>
        </div>
      </div>
    </nav>
    <div className="content">
      <Route path="/composers" exact component={ComposersList} />
      <Route path="/composers/:pk" exact component={ComposerDetail} />
      <Route path="/composers/create" exact component={ComposerCreateUpdate} />
      <Route path="/composers/update/:pk" exact component={ComposerCreateUpdate} />
      <Route path="/textbooks" exact component={TextbooksList} />
    </div>
    <footer id="footer">

    </footer>
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
