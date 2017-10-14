import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWallets } from "../actions";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import { HashLink as Link } from 'react-router-hash-link';

class TestChart extends Component {

  constructor() {
    super();
    this.state = {
      btcprice: "",
      ltcprice: "",
      ethprice: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
      )
      .then(res => {
        this.setState({ btcprice: res.data.BTC.USD });
        this.setState({ ethprice: res.data.ETH.USD });
        this.setState({ ltcprice: res.data.LTC.USD });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.props.fetchWallets();
  }

  renderWallets() {
    return this.props.wallets.map(wallet => {
      var bitcoin = this.state.btcprice;
      var ethereum = this.state.ethprice;
      var litecoin = this.state.ltcprice;
      var bitcoinValue = wallet.bitcoin * bitcoin;
      var ethereumValue = wallet.ethereum * ethereum;
      var litecoinValue = wallet.litecoin * litecoin;

      var totalValue = bitcoinValue + ethereumValue + litecoinValue;
      console.log(wallet._id);

      const walletData = {
        labels: ["Bitcoin", "Ethereum", "Litecoin"],
        datasets: [
          {
            data: [wallet.bitcoin, wallet.ethereum, wallet.litecoin],
            backgroundColor: ["#F2A900", "#3C3C3D", "#88CBF5"],
            hoverBackgroundColor: ["#00cc66", "#00cc66", "#00cc66"]
          }
        ]
      };

      return (
        <div className="wallet-table charts-table col-md-6">
          <h3 id={wallet._id} className="text-center">{wallet.title}</h3>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <strong>Coin Type</strong>
                </th>
                <th>
                  <strong>Total Coins</strong>
                </th>
                <th>
                  <strong>Total Value</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bitcoin</td>
                <td>{wallet.bitcoin}</td>
                <td>
                  ${bitcoinValue
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
                </td>
              </tr>
              <tr>
                <td>Ethereum</td>
                <td>{wallet.ethereum}</td>
                <td>
                  ${ethereumValue
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
                </td>
              </tr>
              <tr>
                <td>Litecoin</td>
                <td>{wallet.litecoin}</td>
                <td>
                  ${litecoinValue
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }

  render() {
    var portfolio = this.props.wallets;

    // Get an array of checkout values only
    var bitcoinAmount = portfolio.map(function(item) {
      return item.bitcoin;
    });

    // Sum the array's values from left to right
    var totalBit = bitcoinAmount.reduce(function(prev, curr) {
      return prev + curr;
    }, 0);

    var ethereumAmount = portfolio.map(function(item) {
      return item.ethereum;
    });

    // Sum the array's values from left to right
    var totalEth = ethereumAmount.reduce(function(prev, curr) {
      return prev + curr;
    }, 0);

    var litecoinAmount = portfolio.map(function(item) {
      return item.litecoin;
    });

    // Sum the array's values from left to right
    var totalLit = litecoinAmount.reduce(function(prev, curr) {
      return prev + curr;
    }, 0);

    var bitcoin = this.state.btcprice;
    var ethereum = this.state.ethprice;
    var litecoin = this.state.ltcprice;

    var bitValue = totalBit * bitcoin;
    var ethValue = totalEth * ethereum;
    var litValue = totalLit * litecoin;

    var portfolioValue = bitValue + ethValue + litValue;

    const data = {
      labels: ["Bitcoin", "Ethereum", "Litecoin"],
      datasets: [
        {
          data: [bitValue, ethValue, litValue],
          backgroundColor: ["#F2A900", "#3C3C3D", "#88CBF5"],
          hoverBackgroundColor: ["#00cc66", "#00cc66", "#00cc66"]
        }
      ]
    };

    const data2 = {
      labels: ["Bitcoin", "Ethereum", "Litecoin"],
      datasets: [
        {
          label: "Current Price",
          backgroundColor: ["#F2A900", "#3C3C3D", "#88CBF5"],
          borderColor: "#000",
          borderWidth: 1,
          hoverBackgroundColor: "#00cc66",
          hoverBorderColor: "#000",
          data: [bitcoin, ethereum, litecoin]
        }
      ]
    };

    return (
      <div>
        <div className="chart">
          <div className="text-center top-charts">
            <h1 className="text-center">Total Portfolio Value</h1>
            <Doughnut data={data} />
          </div>
          <div className="text-center top-charts">
            <h1 className="text-center">Currency Watch</h1>
            <Bar
              data={data2}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true
              }}
            />
          </div>
        </div>
        <div className="row">
        {this.renderWallets()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ wallets }) {
  return { wallets };
}

export default connect(mapStateToProps, { fetchWallets })(TestChart);
