import React, { Component } from 'react';
/* import './Header.css'; */
import HeaderNav from './HeaderNav';

export default class Header extends React.Component {
    render() {
        return (
            <div className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <HeaderNav />
            </div>
        )
    }
}