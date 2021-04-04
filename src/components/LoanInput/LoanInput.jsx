import React, { Component } from 'react'
import { FormInput } from '../index';
import { helperFunctions } from '../utils/helpers';

export default class LoanDetails extends Component {

    handleUserInput = (e) => {
        const {name, value} = e.target;
        this.props.updateUserInput({name, value});
    }

    validateInputs = () => {
        const inputs = [
            {name: 'loanAmt', value: this.props.loanAmt},
            {name: 'intRte', value: this.props.intRte}
        ]
        inputs.forEach(input => {
            const error = helperFunctions.validateUserInputs(input.name, input.value);
            if (error) {
                const data = {name: input.name, value: input.value, error: error}
                this.props.updateUserInput(data);
            }
        })
    }

    handleValidation = (name) => {
        const errors = this.props.errors;
        if (name === 'loanAmt' && errors.loanAmtErr) return errors.loanAmtErr;
        if (name === 'intRte' && errors.intRteErr) return errors.intRteErr;
        return null;
    }

    handleBlur = (e) => {
        let {name, value} = e.target;
        const error = helperFunctions.validateUserInputs(name, value);
        if (error) {
            const data = {name: name, value: value, error: error}
            this.props.updateUserInput(data);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateInputs();
        const { loanAmt, intRte } = this.props;
        if (loanAmt < .01 || intRte < .01) return;
        this.props.calculateLoan();
        this.props.updateUserInput('init');
    }
    
    render() {
        const { loanAmt, intRte } = this.props;

        const userInputs = [
            {
                type: 'number',
                min: 0,
                step: 0.01,
                name: 'loanAmt',
                datatype: 'dollars',
                label: 'Loan Amount',
                value: loanAmt
            },
            {
                type: 'number',
                min: 0,
                step: 0.01,
                name: 'intRte',
                datatype: 'percent',
                label: 'Interest Rate',
                value: intRte
            }
        ];

        return (
            <div className="loan-details-wrapper">
                <div className="loan-details-header">
                    <h2>Loan Information</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>Enter you loan amount and interest rate to calculate your minimum payment and payments remaining.</p>
                    {userInputs.map((input, index) => (
                        <FormInput
                            key={index}
                            {...input}
                            errormessage = {this.handleValidation(input.name)}
                            placeholder='0.00'
                            onBlur={this.handleBlur}
                            onChange={this.handleUserInput}
                        />
                    ))}
                    <FormInput name='submitLoan' value='Calculate Loan' type='submit' />
                </form>
            </div>
        )
    }
}
