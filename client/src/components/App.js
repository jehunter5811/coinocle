import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';

import Header from './Header';
import Landing from './Landing';
import Wallets from './Wallets';
import Billing from './Billing';
import NewWallet from './NewWallet';
const NewTransaction = () => <h2>NewTransaction</h2>;
// const Settings = () => <h2>Settings</h2>;
// const Wallets = () => <h2>Wallets</h2>;
// const Transactions = () => <h2>Transactions</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/wallets" component={Wallets} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/wallets/new" component={NewWallet} />
            <Route exact path="/transactions/new" component={NewTransaction} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
