import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { renderInput } from '../utils/forms';
import { connect } from 'react-redux';
import { addTax, cacheTax, getTax, showNewTax, updateTax } from '../../actions/taxes';
import { hashHistory } from 'react-router';
import _ from 'lodash';

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Please provide a name.';
    }

    if (!values.amount) {
        errors.amount = 'Please provide an amount.';
    }

    if (!values.description) {
        errors.description = 'Please provide an description.';
    } else if (values.description.length < 3) {
        errors.description = 'Description cannot be less than 3 characters.'
    }

    return errors;
}


class Form extends Component {

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            nextProps.initialize(nextProps.current)
        }
    }

    render() {
        let {params, onSaveTax, handleSubmit, pristine, submitting} = this.props;
        let formMode = params.id ? 'Update' : 'New';
        let buttonMode = params.id ? 'Update' : 'Create';
        return (
            <div className="clearfix">
                <div className="content-header">
                    <span className="title"> {formMode} Tax </span>
                </div>
                <div className="col-md-3"> </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSaveTax)}>
                        <Field name="name" component={renderInput} placeholder="Name" />
                        <Field name="amount" component={renderInput} placeholder="Amount" />
                        <Field name="description" component={renderInput} placeholder="Description" />
                        <div className="pull-right form-buttons" >
                            <Link to="/taxes" className="btn btn-default" > Cancel </Link>
                            <button type="submit" className="btn btn-success" disabled={pristine || submitting}> {buttonMode} tax </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"> </div>
            </div >
        );
    }
}
let TaxForm = reduxForm({
    form: 'tax',
    validate
})(Form);

class TaxContainer extends Component {

    componentWillMount() {
        let id = this.props.params.id;
        if (id) {
            this.props.getTax(id);
        }
    }

    componentWillReceiveProps() {
        if (!this.props.params.id && !_.isEqual(this.props.current, {})) {
            this.props.showNewTax();
        }
    }

    shouldComponentUpdate() {
        if (this.props.afterSave) {
            this.goToTaxes();
            return false;
        }
        return true;
    }

    goToTaxes() {
        hashHistory.push('taxes');
    }

    render() {
        //anti pattern
        if (this.props.afterSave) {
            this.goToTaxes();
            return null;
        }

        return (
            <div>
                <TaxForm  {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.taxes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditClick(id) {
            //dispatch(editContact(id))
        },
        onDeleteClick(id) {
            //dispatch(deleteContact(id))
        },
        getTax(id) {
            dispatch(getTax(id));
        },
        showNewTax() {
            dispatch(showNewTax())
        },
        onSaveTax(tax) {
            dispatch(cacheTax(tax));
            if (tax.id) {
                dispatch(updateTax(tax))
            } else {
                dispatch(addTax(tax));
            }
        }
    }
}

const Tax = connect(mapStateToProps, mapDispatchToProps)(TaxContainer)
export default Tax;