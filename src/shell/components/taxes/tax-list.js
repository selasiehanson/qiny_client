import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table'
import { Link } from 'react-router';
import { getTaxes } from '../../actions/taxes';
import { hashHistory } from 'react-router';


class TaxList extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }
    componentWillMount() {
        this.props.loadTaxes();
    }

    //calls the appropriate method based on the action button/text that 
    //was clicked.
    handleEvent(eventName, data) {
        this[eventName](data);
    }

    viewTax(tax) {
        hashHistory.push(`/taxes/${tax.id}`);
    }

    editTax(tax) {
        hashHistory.push(`/taxes/${tax.id}/edit`);
    }

    render() {
        let {taxes} = this.props;
        let tableFields = [
            { name: 'name', header: "Name" },
            { name: "amount", header: "Amount" },
            { name: 'view', type: 'action', header: '', action: 'viewTax' },
            { name: 'edit', type: 'action', header: '', action: 'editTax' }
        ];
        let content = <span> No taxes present, kindly add one. </span>

        let columnWrappers = {
            view(f) {
                return <span> <i className="fa fa-eye"> </i> </span>
            },
            edit(f) {
                return <span> <i className="fa fa-pencil"> </i> </span>
            }

        }

        if (taxes.length !== 0) {
            content = <Table
                tableData={taxes}
                tableFields={tableFields}
                handleEvent={this.handleEvent}
                columnWrappers={columnWrappers} />
        }
        return (
            <div>
                <div className="content-header">
                    <span className="title"> Taxes </span>
                    <span className="pull-right">
                        <Link to="/taxes/new" className="btn btn-primary"> New Tax </Link>
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let {all } = state.taxes
    return {
        taxes: all,
        //transactionForm: state.form['transactions-search']
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {
        loadTaxes() {
            dispatch(getTaxes())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxList);
