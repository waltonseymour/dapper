import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    wallet: undefined,
    balance: undefined
  }
  componentDidMount() {
    window.addEventListener("load", () => {
      if (window.web3) {
        let wallet;
        window.web3.eth.getAccounts((err, accounts) => {
          wallet = accounts[0];
          window.web3.eth.getBalance(wallet, (err, balance) => {
            this.setState({ wallet, balance });
          });
        });
      }
    });
  }

  render() {
    let body;
    if (this.state.wallet) {
      body = <div>your account is: {this.state.wallet} <br /> your balance is: {this.state.balance / Math.pow(10, 18)} ETH</div>;
    } else {
      body = "Loading...";
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Ethereum account viewer</h2>
        </div>
        <p className="App-intro">
          {body}
        </p>
      </div>
    );
  }
}

export default App;
