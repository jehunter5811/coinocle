import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWallets } from "../actions";
import axios from "axios";
import {Doughnut} from 'react-chartjs-2';
import { Link } from "react-router-dom";

class TestChart extends Component {

  constructor () {
      super();
      this.state = {
          btcprice: '',
          ltcprice: '',
          ethprice: ''
      };
  }
  componentWillMount () {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
          .then(res => {
              this.setState({ btcprice: res.data.BTC.USD });
              this.setState({ ethprice: res.data.ETH.USD });
              this.setState({ ltcprice: res.data.LTC.USD });
          })

          .catch(error => {
              console.log(error)
          })
  }

  componentDidMount() {
    this.props.fetchWallets();
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
      labels: [
    		'Bitcoin',
    		'Ethereum',
    		'Litecoin'
    	],
    	datasets: [{
    		data: [bitValue, ethValue, litValue],
    		backgroundColor: [
    		'#F2A900',
    		'#3C3C3D',
    		'#88CBF5'
    		],
    		hoverBackgroundColor: [
    		'#00cc66',
    		'#00cc66',
    		'#00cc66'
    		]
    	}]
    }

    return (
      <div>
        <Doughnut data={data} />
      </div>
    );
  }
}

function mapStateToProps({ wallets }) {
  return { wallets };
}

export default connect(mapStateToProps, { fetchWallets })(TestChart);
