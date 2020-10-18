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
  <div className="wrapper">
    <nav className="navbar">
      <a className="logo" href="/">
          <div></div>
          <span>Harmony</span>

      </a>
      <ul className="menu">
        <li className="menu-item">
          <a href="/composers">
            <div></div>
            <span>Музыкальная литература</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="/harmony">
            <div></div>
            <span>Гармония</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="/textbooks">
            <div></div>
            <span>Учебники</span>
          </a>
        </li>
      </ul>
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
