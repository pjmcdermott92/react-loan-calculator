import React, { Component } from 'react';
import PaymentRow from './PaymentRow';
import './PaymentsTable.scss';

export default class PaymentsTable extends Component {

    render() {
        return (
            <div className="payment-history-section">
                <h2>Payment History</h2>
                <table className="payment-details-table">
                    <thead>    
                        <tr className="payment-table-heading">
                            <th className="date">Date</th>
                            <th>Amount</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.payments.map((payment, index) => (
                            <PaymentRow key={index} {...payment} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
