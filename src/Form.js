import * as React from "react";

import { Button, Intent } from "@blueprintjs/core";

export class Form extends React.Component {
    render() {
        return <div className="pt-form-group send-form">
            <input type="text" className="pt-input pt-fill" placeholder="address"
                value={this.props.address} onChange={this.props.onAddressChange} />
            <input className="pt-input pt-fill" type="number" placeholder="amount"
                value={this.props.amount} onChange={this.props.onAmountChange} />
            <Button className="pt-fill" iconName={"confirm"} intent={Intent.PRIMARY} onClick={this.props.onSubmit}>Send ETH</Button>
        </div>;
    }
}