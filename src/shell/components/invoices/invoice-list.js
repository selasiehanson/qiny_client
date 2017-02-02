import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table';
import { Link } from 'react-router';
import { getInvoices, initGetInvoices } from '../../actions/invoices';
import { hashHistory } from 'react-router';


class InvoiceList extends Component {

    constructor(props) {
        super(props)
        this.handleEvent = this.handleEvent.bind(this);
    }

    componentWillMount() {
        this.props.loadInvoices();
    }

    //calls the appropriate method based on the action button/text that 
    //was clicked.
    handleEvent(eventName, data) {
        this[eventName](data);
    }


    viewInvoice(invoice) {
        hashHistory.push(`/invoices/${invoice.id}`);
    }

    editInvoice(invoice) {
        hashHistory.push(`/invoices/${invoice.id}/edit`);
    }

    render() {

        let {all, loading} = this.props;
        let tableFields = [
            { name: 'invoice_number', header: 'Invoice Number' },
            { name: 'invoice_date', header: "Invoice Date" },
            { name: 'due_date', header: "Due Date" },
            { name: "client", header: "Client" },
            { name: "total_amount", header: "Total Amount" },
            { name: "total_tax", header: "Total Tax" },
            { name: 'status', header: 'Status' },
            { name: 'view', type: 'action', header: '', action: 'viewInvoice' },
            { name: 'edit', type: 'action', header: '', action: 'editInvoice' }
        ];

        const statusClasses = {
            draft: 'label-warning',
            paid: 'label-success',
            overdue: 'label-danger'
        }

        let invoiceLink = <Link to="/invoices/new" className="btn btn-primary"> New invoice </Link>;
        let content;
        if (loading) {
            content = <div className="zero-items">
                <p> Fetching invoices please wait ....  </p>
            </div >
        } else {
            content = <div className="zero-items">
                <p> No invoices present, kindly add one. </p>
                {invoiceLink}
            </div>
        }
        let columnWrappers = {
            status(f) {
                const klass = `label ${statusClasses[f]}`
                return <span className={klass}> {f} </span>
            },
            view(f) {
                return <span> <i className="fa fa-eye"> </i> </span>
            },
            edit(f) {
                return <span> <i className="fa fa-pencil"> </i> </span>
            }
        }
        let newInvoiceLink;
        if (all.length !== 0) {
            content = <Table
                tableData={all}
                tableFields={tableFields}
                handleEvent={this.handleEvent}
                columnWrappers={columnWrappers} />
            newInvoiceLink = invoiceLink;

        }
        return (
            <div>
                <div className="content-header">
                    <span className="title"> Invoices </span>
                    <span className="pull-right">
                        {newInvoiceLink}
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    return {
        ...state.invoices,
        //transactionForm: state.form['transactions-search']
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {
        loadInvoices() {
            dispatch(initGetInvoices());
            dispatch(getInvoices());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
