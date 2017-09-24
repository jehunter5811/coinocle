import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Wallets extends Component {

  render() {
    return (
      <div>
        <div className="container text-center">
          <h2>Dashboard</h2>
          <div>
            <Link to="/dashboard"><h1 className="total-wallet-value">$0.00</h1></Link>
            <h3>Total Current Value</h3>
            <div className="wallet-table">
              <table className="table table-bordered table-striped table-hover">
                <tr>
                  <th className="text-center">Wallet Name</th>
                  <th className="text-center">Current Value</th>
                </tr>
                <tr>
                  <td>
                    <Link to="/wallets/new" className="addAWallet" href="#">
                      Add a wallet
                    </Link>
                  </td>
                  <td className="empty-state">$0.00</td>
                </tr>
                <tr>
                  <td>
                    <span className="emptyTD" />
                  </td>
                  <td>
                    <span className="emptyTD" />
                  </td>
                </tr>
              </table>
              <h3>Wallets</h3>
            </div>
          </div>
        </div>
        <div className="addTransactionButton">
          <a href="#" className="text-center plus-sign">
            +
          </a>
        </div>
      </div>
    );
  }
}

export default Wallets;
