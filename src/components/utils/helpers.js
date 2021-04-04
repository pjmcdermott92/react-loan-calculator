export const helperFunctions = {

    validateUserInputs(name, value, bal, minPmt) {
        const numAmt = parseFloat(value);
        const minBal = bal * .01;
        if (name === 'loanAmt') {
            return {loanAmtErr: isNaN(numAmt) || numAmt < .01
                ? 'Loan Amount cannot be zero'
                : ''
            }
        };
        if (name === 'intRte') {
            return {intRteErr: isNaN(numAmt) || (numAmt < .01 || numAmt > 100)
                ? 'Interest Rate must be between .01% and 100%'
                : ''
            }
        };
        if (name === 'pmtAmt') {
            if (isNaN(numAmt) || numAmt < .01) return {pmtAmtErr: 'Please enter a Payment Amount.'};
            if (numAmt < minBal) return {pmtAmtErr: 'Payment must be at least 1% of Current Balance.'};
        }
        return '';
    },

    calculateMinPayment(loanAmt, intRte) {
        const amount = parseFloat(loanAmt);
        const rate = parseFloat(intRte);
        const interest = (rate / 12 / 100) * amount;
        const principal = amount * .01;
        return Number((principal + interest).toFixed(2));
    },

    calculateRemainingPayments(currentBalance, minPmt, intRte) {
        const periodRate = intRte / 12 / 100;
        let balance = currentBalance;
        let numPmts = 0;
        while (balance > 0) {
            const currentInt = balance * periodRate;
            const principal = minPmt - currentInt;
            balance = balance - principal;
            numPmts++
        }
        return numPmts;
    },

    calculateTotalInterest(loanAmt, intRte, minPmt) {
        const periodRate = intRte / 100 / 12;
        let intPaid = 0;
        let balance = loanAmt;
        while (balance > 0) {
            const interest = balance * periodRate;
            const principal = minPmt - interest;
            balance = balance - principal;
            intPaid = intPaid + interest;
        }
        return intPaid;
    },

    buildPayment(pmtAmt, intRte, currentBalance) {
        const currentInterest = (intRte / 100 / 12) * currentBalance;
        const principalPaid = pmtAmt - currentInterest;
        const interestPaid = pmtAmt - principalPaid;
        const newBalance = currentBalance - principalPaid;
        const payment = {
            date: getTheDate(),
            pmtAmt: pmtAmt,
            principal: Number(principalPaid.toFixed(2)),
            interest: Number(parseFloat(interestPaid).toFixed(2)),
            balance: Number(newBalance.toFixed(2))
        };
        return payment;
    },

    delimitValue(value) {
        const valueToDollars = parseFloat(value).toFixed(2);
        return valueToDollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function getTheDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
}