import React, { Component } from 'react';
import './App.css';
var Web3 = require('web3')

window.web3 = new Web3(window.web3.currentProvider);

class App extends Component {
  state = {
    wallet: undefined,
    balance: undefined
  }
  componentDidMount() {
    if (window.web3) {
      let wallet;
      window.web3.eth.getAccounts((err, accounts) => {
        wallet = accounts[0];
        window.web3.eth.getBalance(wallet).then((balance) => {
          this.setState({ wallet, balance });
        });
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Ethereum account viewer</h2>
        </div>
        <p className="App-intro">
         your account is: {this.state.wallet} <br />
         your balance is: {this.state.balance / Math.pow(10, 18)} ETH
        </p>
      </div>
    );
  }
}

export default App;
