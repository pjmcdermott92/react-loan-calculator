import React, { Component } from 'react'
import './FormInput.scss';

export default class FormInput extends Component {
    
    runValidation = (obj) => {
        if (this.props.errormessage !==null) {
            if (obj === 'label') return true;
            if (obj === 'message') return this.props.errormessage;
        } else {
            if (obj === 'label') return false;
            if (obj === 'message') return null;
        }
    }

    render() {
        return (
            <div className="form-control">
                <label
                    htmlFor={this.props.name}
                    data-type={this.props.datatype}
                    data-error={this.runValidation('label')}
                >
                    {this.props.label}
                    <input {...this.props} id={this.props.name} />
                    <span className="error-message">
                        {this.runValidation('message')}
                    </span>
                </label>
            </div>
        )
    }
}
