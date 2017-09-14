import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logoWhite.png";
import "./App.css";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return   <ul className="nav navbar-nav navbar-right"><li><a href="#">Sign In</a></li><li><a href="#">Contact</a></li></ul>;
      default:
        return   <ul className="nav navbar-nav navbar-right"><li><a href="/api/logout">Sign Out</a></li><li><a href="#">Help</a></li></ul>;
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="glyphicon glyphicon-option-vertical" />
              </button>
              <a className="navbar-brand" href="/">
                <img src={logo} alt="Coinocle" />
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <a href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
              {this.renderContent()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
