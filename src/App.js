import React, { Component } from 'react';
import { Form } from "./Form";
import './App.css';

class App extends Component {
  state = {
    wallet: undefined,
    balance: undefined,
    amount: 0,
    address: ""
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

  sendEther = () => {
    const txn = {
      from: this.state.wallet,
      to: this.state.address,
      value: this.state.amount * Math.pow(10, 18)
    };

    window.web3.eth.sendTransaction(txn, (err, result) => {
      console.log(err);
      console.log(result);
    });
  }


  render() {
    let body;
    if (this.state.wallet) {
      body = <div>
        your account is: {this.state.wallet} <br />
        your balance is: {this.state.balance / Math.pow(10, 18)} ETH <br />
        <br />
          <Form
            address={this.state.address}
            amount={this.state.amount}
            onAddressChange={(e) => this.setState({ address: e.target.value })}
            onAmountChange={(e) => this.setState({ amount: e.target.value })}
            onSubmit={this.sendEther}
          />
        </div>;
    } else {
      body = "Loading...";
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Ethereum account viewer</h2>
        </div>
        <div className="App-intro">
          {body}
        </div>
      </div>
    );
  }
}

export default App;
