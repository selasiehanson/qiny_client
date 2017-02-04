import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table'
import { Link } from 'react-router';
import { getTaxes, initGetTaxes } from '../../actions/taxes';
import { hashHistory } from 'react-router';
import Pagination from 'react-js-pagination';

const PAGE_SZIE = 3;


class TaxList extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
    }
    componentWillMount() {
        this.props.loadTaxes({ size: PAGE_SZIE, page: this.props.page });
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

    pageChanged(pageNumber) {
        let values = {
            page: pageNumber,
            size: PAGE_SZIE
        };

        //this.props.dispatch(showSpinner());
        this.props.loadTaxes(values);
    }

    render() {
        let {taxes, loading, pageChanged, totalCount, page} = this.props;
        let tableFields = [
            { name: 'name', header: "Name" },
            { name: "amount", header: "Amount" },
            { name: 'view', type: 'action', header: '', action: 'viewTax' },
            { name: 'edit', type: 'action', header: '', action: 'editTax' }
        ];
        let taxLink = <Link to="/taxes/new" className="btn btn-primary"> New Tax </Link>
        let content;
        if (loading) {
            content = <div className="zero-items">
                <p> Fetching taxes please wait ....  </p>
            </div >
        } else {
            content = <div className="zero-items">
                <p> No taxes present, kindly add one. </p>
                {taxLink}
            </div>
        }
        let columnWrappers = {
            view(f) {
                return <span> <i className="fa fa-eye"> </i> </span>
            },
            edit(f) {
                return <span> <i className="fa fa-pencil"> </i> </span>
            }

        }
        let newTaxLink;
        if (taxes.length !== 0) {
            content = <div>
                <Table
                    tableData={taxes}
                    tableFields={tableFields}
                    handleEvent={this.handleEvent}
                    columnWrappers={columnWrappers} />
                <Pagination
                    activePage={page}
                    itemsCountPerPage={PAGE_SZIE}
                    totalItemsCount={totalCount}
                    pageRangeDisplayed={4}
                    onChange={this.pageChanged}
                />
            </div>
            newTaxLink = taxLink;
        }
        return (
            <div>
                <div className="content-header">
                    <span className="title"> Taxes </span>
                    <span className="pull-right">
                        {newTaxLink}
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let {all, loading } = state.taxes
    return {
        ...state.taxes,
        taxes: all,
        loading
        //transactionForm: state.form['transactions-search']
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {
        loadTaxes(values) {
            dispatch(initGetTaxes())
            dispatch(getTaxes(values))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxList);
