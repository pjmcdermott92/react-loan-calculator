import React, { Component } from 'react';
import { LoanInput, LoanSummary, PaymentsSummary, PaymentsTable } from './components';
import { helperFunctions } from './components/utils/helpers';
import './styles/root.scss';

const INIT_LOAN_DETAILS = { amount: 0, rate: 0, minPmt: 0 };
const INIT_USER_INPUTS = { loanAmt: '', intRte: '', pmtAmt: '', errors: {} };

export default class Calculator extends Component {

    constructor() {
        super();
        this.state = {
            LoanDetails: INIT_LOAN_DETAILS,
            UserInputs: INIT_USER_INPUTS,
            Payments: []
        }
    }

    updateUserInput = (data) => {
        if (data === 'init') {
            this.setState({UserInputs: INIT_USER_INPUTS});
            return;
        }
        let { name, value, error } = data;
        this.setState(prevState => (
            { UserInputs:
                {...prevState.UserInputs, [name]: value,
                    errors: {...prevState.UserInputs.errors, ...error}} }
        ));
    }

    calculateLoan = () => {
        const { loanAmt, intRte } = this.state.UserInputs;
        const amount = Number(loanAmt);
        const rate = Number(intRte);
        const minPmt = helperFunctions.calculateMinPayment(amount, rate);
        this.setState({LoanDetails: {amount: amount, rate: rate, minPmt: minPmt}});
    }

    newLoan = () => {
        this.setState({LoanDetails: INIT_LOAN_DETAILS, Payments: []});
    }

    applyPayment = (payment) => {
        this.setState(prevState => ({Payments: [payment, ...prevState.Payments]}));
    }

    render() {
        const { LoanDetails, UserInputs, Payments } = this.state;
        const loanSummary = LoanDetails.amount > 0 && LoanDetails.rate > 0 ? true : false;

        return (
            <>
                <div className="hero-section">
                    <h1 className="title">Loan Calculator</h1>
                    <p>Use this Loan Calculator to calculate your minimum payment, how many payments you have left on your loan, and to track your payments.</p>
                </div>
                <div className="calculator-wrapper">
                    <div className="loan-information-section">
                        {
                            loanSummary
                            ? <LoanSummary
                                {...LoanDetails}
                                {...UserInputs}
                                payments = {Payments}
                                applypayment = {this.applyPayment}
                                newloan = {this.newLoan}
                                updateUserInput = {this.updateUserInput}
                            />
                            : <LoanInput
                                {...UserInputs}
                                updateUserInput = {this.updateUserInput}
                                calculateLoan = {this.calculateLoan}
                            />
                        }
                    </div>
                    <div className="payments-section" data-active={loanSummary}>
                        <PaymentsSummary payments = {Payments} />
                        <PaymentsTable payments = {Payments} />
                        { !Payments.length ? <div className="no-payments">No payments have been made.</div> : '' }
                    </div>
                </div>
            </>
        )
    }
}
