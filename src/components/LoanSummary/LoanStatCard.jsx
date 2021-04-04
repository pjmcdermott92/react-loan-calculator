import React, { Component } from 'react';

export default class LoanStatCard extends Component {
    render() {

        const { label, symbol, amount, subtext } = this.props;

        return (
            <div className="loan-stat-card">
                <div className="stat-title">
                    {label}
                </div>
                <div className="stat-info">
                    <sup>{symbol}</sup>
                    {amount}
                </div>
                <div className="subtext">
                    {subtext}
                </div>
            </div>
        )
    }
}
