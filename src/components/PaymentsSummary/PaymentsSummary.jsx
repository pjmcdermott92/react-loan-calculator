import React, { Component } from 'react';
import { helperFunctions } from '../utils/helpers';
import './PaymentsSummary.scss';

export default class PaymentsSummary extends Component {
    
    calculateAmtPaid = (item) => {
        const payments = this.props.payments;
        if (payments.length < 1) return 0;
        return payments.reduce((prev, curr) => {
            return prev + curr[item];
        }, 0);
    }

    delimit = (value) => helperFunctions.delimitValue(value);

    render() {

        const principalPaid = this.calculateAmtPaid('principal');   
        const interestPaid = this.calculateAmtPaid('interest');   
        const totalPaid = principalPaid + interestPaid;   

        return (
            <div className="payment-summary-section">
            <h2>Payment Summary</h2>
            <div className="detail-item">
                <div>Total Principal Paid:</div>
                <div>
                    <sup>$</sup>
                    {this.delimit(principalPaid)}
                </div>
            </div>
            <div className="detail-item">
                <div>Total Interest Paid:</div>
                <div>
                    <sup>$</sup>
                    {this.delimit(interestPaid)}
                </div>
            </div>
            <div className="detail-item total">
                <div>Total Amount Paid:</div>
                <div>
                    <sup>$</sup>
                    {this.delimit(totalPaid)}
                </div>
            </div>
        </div>
        )
    }
}
