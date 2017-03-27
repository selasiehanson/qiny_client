import React, {Component} from 'react';
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
import { dateHelpers } from '../../utils/date-helpers';
import moment from 'moment';

const validate = (values) => {
    const errors = {};

    if(!values.currency) {
      errors.currency = "Currency is required."
    }

    if(!values.client) {
      errors.client = "Client is required."
    }

    if(!values.invoice_date) {
      errors.invoice_date = "Invoice date is required."
    }

    if(!values.due_date) {
      errors.due_date = "Due date is required."
    }
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

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            // nextProps.initialize(nextProps.current)
            let invoiceForm = {};
            if (nextProps.isLoading) {
                invoiceForm = {}
            } else {
                if (_.isEqual(nextProps.current, {})) {
                    invoiceForm = null;
                } else {
                    invoiceForm = convertFromInvoiceToForm(nextProps.current)
                }
            }
            nextProps.initialize(invoiceForm)
        }
    }

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
        const {currency, invoice_lines, currencies} = this.props;
        return (
            <div>
                <div className="summing-box clearfix">
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <Field name="currency"
                                component={renderSelect}
                                placeholder="Currency"
                                options={currencies}
                                labelKey="currency_code" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <label>Tax amount: </label>
                            <label className="pull-right"> {currency} {this.getTotalTax(invoice_lines)} </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right">
                            <label>Sub Total: </label>
                            <label className="pull-right"> {currency} {this.getTotalAmount(invoice_lines) - this.getTotalTax(invoice_lines)} </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 pull-right total-box">
                            <label>Total: </label>
                            <label className="pull-right"> {currency} {this.getTotalAmount(invoice_lines)} </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getTotalAmount(invoice_lines = []) {
        var total = invoice_lines.reduce((result, line) => {
            result += (+line.price * line.quantity)
            return result;
        }, 0);

        return total;
    }


    getTotalTax(invoice_lines) {
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
    let dateFormat = "YYYY/MM/DD";
    invoice.client_id = invoice.client.value;
    invoice.currency_id = invoice.currency.value;
    invoice.invoice_lines = invoice.invoice_lines || [];
    invoice.invoice_lines = invoice.invoice_lines.map((line) => {
        line.product_id = line.product.value;
        return line;
    });
    invoice.due_date = moment(invoice.due_date).format(dateFormat);
    invoice.invoice_date = moment(invoice.invoice_date).format(dateFormat);
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

    const convertToMMDDYYYWithSlashes = (dateWithDashes) => moment(dateWithDashes).format('MM/DD/YYYY');

    form.invoice_date = convertToMMDDYYYWithSlashes(invoiceJson.invoice_date);
    form.due_date = convertToMMDDYYYWithSlashes(invoiceJson.due_date);
    return form;
}


const mapStateToProps = (state, ownProps) => {
    const selector = formValueSelector('invoice')
    const currency = selector(state, 'currency');
    const invoice_lines = selector(state, 'invoice_lines') || []

    return {
        ...ownProps,
        ...state.invoices,
        clients: state.clients.all,
        products: state.products.all,
        currencies: state.currencies.all,
        currency: currency ? currency.label : '',
        invoice_lines,
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
            //dispatch(editInvoice(id))
        },
        onDeleteClick(id) {
            //dispatch(deleteInvoice(id))
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

