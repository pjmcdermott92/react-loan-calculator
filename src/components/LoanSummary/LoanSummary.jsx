import React, { Component } from 'react';
import { FormInput, LoanStatCard } from '../index';
import { helperFunctions } from '../utils/helpers';
import './LoanSummary.scss';

export default class LoanSummary extends Component {

    handleUserInput = (e) => {
        const {name, value} = e.target;
        this.props.updateUserInput({name, value});
    }

    validatePmt = () => {
        const name = 'pmtAmt';
        const value = this.props.pmtAmt;
        const currentBalance = !this.props.payments.length ? this.props.amount : this.props.payments[0].balance;
        const error = helperFunctions.validateUserInputs(name, value, currentBalance);
        if (error) {
            const data = {name: name, value: value, error: error}
            this.props.updateUserInput(data);
        }
    }

    handleValidation = () => {
        const errors = this.props.errors;
        if (errors.pmtAmtErr) return errors.pmtAmtErr;
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validatePmt();
        const { pmtAmt, rate, amount, payments } = this.props;
        const balance = !payments.length ? amount : payments[0].balance;
        if (pmtAmt < .01 || pmtAmt < (balance * .01)) return;
        const payment = helperFunctions.buildPayment(pmtAmt, rate, balance);
        this.props.applypayment(payment);
        this.props.updateUserInput('init');
    }

    delimit = (value) => helperFunctions.delimitValue(value);

    render() {

        const { rate, amount, minPmt, payments } = this.props;
        const currentBalance = !payments.length ? amount : payments[0].balance;
        const minPayment = currentBalance < minPmt ? ((currentBalance * (rate / 100 / 12)) + currentBalance) : minPmt;
        const loanStats = [
            {label: 'Minimum Payment', symbol: '$', amount: this.delimit(minPayment)},
            {label: 'Payments Remaining', amount: helperFunctions.calculateRemainingPayments(currentBalance, minPmt, rate), subtext: '(Paying only the Minimum Payment)'},
            {label: 'Current Balance', symbol: '$', amount: this.delimit(currentBalance)},
        ];
        const totalInterestPaid = this.delimit(helperFunctions.calculateTotalInterest(amount, rate, minPmt));
        const formIsDisabled = currentBalance === 0 ? true : false;

        return (
            <div className="loan-details-wrapper">
                <div className="loan-details-header">
                    <h2>Loan Summary</h2>
                    <button className="edit-loan-btn" onClick={this.props.newloan}>
                        &lt; Calculate New Loan
                    </button>
                </div>
                <p className="loan-details-summary">Loan Amount: ${this.delimit(amount)} | Interest Rate: {this.delimit(rate)}%</p>
                <div className="loan-stats-container">
                    {loanStats.map((stat, index) => (<LoanStatCard key={index} {...stat} />))}
                </div>
                <div className="tooltip">
                    <p>If you pay only the minimum payment, you will end up paying <strong>${totalInterestPaid}</strong> in interest by the end of your loan term. To reduce the amount of interest you pay, pay more than the minimum each payment.</p>
                </div>
                <h3>Make a Payment</h3>
                <p>To apply a payment to your loan, enter your payment amount below. <em>NOTE: Payment amount must be at least 1% of Current Balance.</em></p>
                <form onSubmit={this.handleSubmit} data-disabled={formIsDisabled}>
                    <FormInput
                        name='pmtAmt'
                        label='Payment Amount'
                        type="number"
                        datatype="dollars"
                        min="0"
                        step=".01"
                        errormessage={this.handleValidation()}
                        placeholder="0.00"
                        value={this.props.pmtAmt}
                        onChange={this.handleUserInput}
                        disabled={formIsDisabled}
                    />
                    <FormInput name='submitPmt' value='Make Payment' type='submit' disabled={formIsDisabled} />
                </form>
            </div>
        )
    }
}
