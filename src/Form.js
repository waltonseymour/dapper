import * as React from "react";

export class Form extends React.Component {
    render() {
        return <div>
            <input type="text" placeholder="address"
                value={this.props.address} onChange={this.props.onAddressChange} />
            <input type="number" placeholder="amount"
                value={this.props.amount} onChange={this.props.onAmountChange} />
            <button onClick={this.props.onSubmit}>send ETH</button>
        </div>;
    }
}