import React, { Component } from 'react';
import { helperFunctions } from '../utils/helpers';

export default class PaymentRow extends Component {
    
    delimit = (value) => helperFunctions.delimitValue(value);

    render() {
        const { date, pmtAmt, principal, interest, balance } = this.props;
        return (
            <tr>
                <td>{date}</td>
                <td>${this.delimit(pmtAmt)}</td>
                <td>${this.delimit(principal)}</td>
                <td>${this.delimit(interest)}</td>
                <td>${this.delimit(balance)}</td>
            </tr>
        )
    }
}
