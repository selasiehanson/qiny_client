import React, { Component } from 'react';
import { Link } from 'react-router';
import {
    renderInput,
    renderDate,
    renderSelect
} from '../utils/forms';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { getClients } from '../../actions/clients';
import { addInvoice, cacheInvoice, getInvoice, showNewInvoice, setInvoiceLoading, updateInvoice } from '../../actions/invoices';
import { getCurrencies } from '../../actions';
import _ from 'lodash';

const validate = (values) => {
    const errors = {};

    return errors;
}

const renderLineItems = (props) => {
    let {fields, products} = props;
    const addLine = () => {
        let newItem = {
            description: "",
            quantity: 1,
            discount_flat: 0,
            discount_percentage: 0,
            tax: 0,
            price: ""
        };
        fields.push(newItem);
    }

    const renderLine = (line, idx) => {
        return (
            <tr key={idx}>
                <td> {idx + 1}. </td>
                <td className="item-name-col">
                    <Field name={`${line}.product`} component={renderSelect} className="input-sm tright" options={products} />
                </td>
                <td className="item-description-col">
                    <Field name={`${line}.description`} component={renderInput} className="input-sm tright" />
                </td>
                <td>
                    <Field name={`${line}.quantity`} component={renderInput} className="input-sm tright" />
                </td>
                <td>
                    <Field name={`${line}.price`} component={renderInput} className="input-sm tright" />
                </td>

                <td>
                    <Field name={`${line}.tax`} component={renderInput} className="input-sm tright" />
                </td>
                <td>
                    <Field name={`${line}.line_total`} component={renderInput} className="input-sm tright" disabled={true} />
                </td>
                <td>
                    <a onClick={() => fields.remove(idx)}> <i className="fa fa-trash"></i> </a>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <div className="clearfix">
                <div className="pull-right add-btn">
                    <a className="btn btn-default" onClick={addLine}>  <i className="fa fa-plus"></i> Add Item </a>
                </div>
            </div>
            <div className="">
                <table className="table-custom table">
                    <thead>
                        <tr>
                            <th className="col-1"></th>
                            <th className="item-name-col"> Item </th>
                            <th className="item-description-col"> Description </th>
                            <th> Quantity </th>
                            <th> Price </th>
                            <th> Tax </th>
                            <th> Line Total </th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(renderLine)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

class Form extends Component {

    handleChange(date) {

    }

    onInputChange() {

    }

    computePrice(quantity, unit_cost) {
        if (quantity === 0)
            return 0;
        if (!unit_cost || unit_cost === 0)
            return 0;
    }

    renderInvoiceHeader() {

        return (
            <div className="row">
                <div className="col-md-3">
                    <Field name="invoice_date" component={renderDate} placeholder="Invoice Date" />
                </div>
                <div className="col-md-3">
                    <Field name="due_date" component={renderDate} placeholder="Due Date" />
                </div>
                <div className="col-md-3">
                    <Field name="client" component={renderSelect} placeholder="Client" options={this.props.clients} />
                </div>
                <div className="col-md-3">
                    <Field name="invoice_number" component={renderInput} placeholder="Invoice Number" />
                </div>
            </div>
        );
    }

    renderInvoicerFooter(buttonMode) {
        return (
            <div>
                <div className="summing-box clearfix">
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <Field name="currency"
                                component={renderSelect}
                                placeholder="Currency"
                                options={this.props.currencies}
                                labelKey="currency_code" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <label>Tax amount: </label>
                            <label className="pull-right"> {this.getCurrency()} {this.getTotalTax()} </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <label>Sub Total: </label>
                            <label className="pull-right"> {this.getCurrency()} {this.getTotalAmount() - this.getTotalTax()} </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right total-box">
                            <label>Total: </label>
                            <label className="pull-right"> {this.getCurrency()} {this.getTotalAmount()} </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getCurrency() {
        if (this.modelNotSet()) {
            return '';
        }

        if (this.props.currentInvoiceForm.values.currency) {
            return this.props.currentInvoiceForm.values.currency.label;
        }
        return '';
    }

    getTotalAmount() {
        if (this.modelNotSet()) {
            return '';
        }

        let {invoice_lines = []} = this.props.currentInvoiceForm.values;
        var total = invoice_lines.reduce((result, line) => {
            result += (+line.price * line.quantity)
            return result;
        }, 0);

        return total;
    }

    modelNotSet() {
        if (_.isEqual(this.props.currentInvoiceForm, {})) {
            return true;
        }

        if (!_.keys(this.props.currentInvoiceForm).includes('values')) {
            return true;
        }
        return false;
    }

    getTotalTax() {
        if (this.modelNotSet()) {
            return '';
        }
        //todo: actual tax computation to come later
        return 0;
    }

    render() {

        let {handleSubmit, saveInvoice, pristine, submitting, products, params} = this.props;
        let formMode = params.id ? 'Update' : 'New';
        let buttonMode = params.id ? 'Update' : 'Create';

        let actionLinks = <span className="pull-right">
            <Link to="/invoices" className="btn btn-default"> Cancel </Link>
            <button type="submit" className="btn btn-success" disabled={pristine || submitting}> {buttonMode} invoice </button>
        </span>;

        // let options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function (fruit) {
        //     return { label: fruit, value: fruit }
        // });

        return (
            <div className="invoice">
                <div className="content-header">
                    <span className="title"> {formMode} Invoice </span>
                    {actionLinks}
                </div>
                <form onSubmit={handleSubmit(saveInvoice)}>
                    <div>
                        {this.renderInvoiceHeader()}
                        <FieldArray name="invoice_lines" component={renderLineItems} products={products} />
                        <div>
                            {this.renderInvoicerFooter(buttonMode)}
                        </div>
                        <div className="clearfix actions">
                            {actionLinks}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

let InvoiceForm = reduxForm({
    form: 'invoice',
    enableReinitialize: true,
    validate
})(Form);


class InvoiceContainer extends Component {
    componentWillMount() {
        let id = this.props.params.id;
        if (id) {
            this.props.getInvoice(id);
        }
        this.props.loadResources();
    }

    componentWillReceiveProps() {
        if (!this.props.params.id && !_.isEqual(this.props.current, {})) {
            this.props.showNewInvoice();
        }
    }

    render() {
        return (
            <div>
                <InvoiceForm {...this.props} />
            </div>
        );
    }
}


const transformInvoiceToPersist = (invoice) => {
    invoice.client_id = invoice.client.value;
    invoice.currency_id = invoice.currency.value;
    invoice.invoice_lines = invoice.invoice_lines || [];
    invoice.invoice_lines = invoice.invoice_lines.map((line) => {
        line.product_id = line.product.value;
        return line;
    });
    return invoice;
}

const convertFromInvoiceToForm = (invoiceJson) => {
    if (!invoiceJson)
        return null;

    let form = Object.assign({}, invoiceJson);
    form.client = {
        label: invoiceJson.client.name,
        value: invoiceJson.client.id
    };
    form.invoice_lines = invoiceJson.invoice_lines.map((line) => {
        let modifiedLine = Object.assign({}, line);
        modifiedLine.product = {
            label: line.product.name,
            value: line.product.id
        };
        return modifiedLine;
    });
    form.currency = {
        label: invoiceJson.currency.currency_code,
        value: invoiceJson.currency.id
    };

    return form;
}


const mapStateToProps = (state, ownProps) => {

    let invoiceForm = {};
    if (state.invoices.isLoading) {
        invoiceForm = {}
    } else {
        if (_.isEqual(state.invoices.current, {})) {
            invoiceForm = null;
        } else {
            invoiceForm = convertFromInvoiceToForm(state.invoices.current)
        }
    }

    return {
        ...ownProps,
        ...state.invoices,
        clients: state.clients.all,
        products: state.products.all,
        currencies: state.currencies.all,
        initialValues: invoiceForm,
        currentInvoiceForm: state.form.invoice || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadResources() {
            dispatch(getClients());
            dispatch(getProducts());
            dispatch(getCurrencies());
        },
        onEditClick(id) {
            //dispatch(editContact(id))
        },
        onDeleteClick(id) {
            //dispatch(deleteContact(id))
        },
        getInvoice(id) {
            dispatch(setInvoiceLoading())
            dispatch(getInvoice(id));
        },
        showNewInvoice() {
            dispatch(showNewInvoice())
        },
        saveInvoice(invoice) {
            dispatch(cacheInvoice(invoice));
            if (invoice.id) {
                dispatch(updateInvoice(transformInvoiceToPersist(invoice)));
            } else {
                dispatch(addInvoice(transformInvoiceToPersist(invoice)));
            }
        }
    }
}


const Invoice = connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer)
export default Invoice;

