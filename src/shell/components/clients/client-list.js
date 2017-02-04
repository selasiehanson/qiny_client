import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table'
import { Link } from 'react-router';
import { getClients, initGetClients } from '../../actions/clients';
import { hashHistory } from 'react-router';
import Pagination from 'react-js-pagination';

const PAGE_SZIE = 3;

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
    }
    componentWillMount() {
        this.props.loadClients({ size: PAGE_SZIE, page: this.props.page });
    }

    //calls the appropriate method based on the action button/text that 
    //was clicked.
    handleEvent(eventName, data) {
        this[eventName](data);
    }

    viewClient(client) {
        hashHistory.push(`/clients/${client.id}`);
    }

    editClient(client) {
        hashHistory.push(`/clients/${client.id}/edit`);
    }

    pageChanged(pageNumber) {
        let values = {
            page: pageNumber,
            size: PAGE_SZIE
        };

        //this.props.dispatch(showSpinner());
        this.props.loadClients(values);
    }

    render() {
        let {clients, loading, pageChanged, totalCount, page} = this.props;

        let tableFields = [
            { name: 'name', header: "Name" },
            { name: "email", header: "Email" },
            { name: "phone_number", header: "Phone Number" },
            { name: "address", header: "Address" },
            { name: 'view', type: 'action', header: '', action: 'viewClient' },
            { name: 'edit', type: 'action', header: '', action: 'editClient' }
        ];

        let clientLink = <Link to="/clients/new" className="btn btn-primary"> New Client </Link>


        let content;
        if (loading) {
            content = <div className="zero-items">
                <p> Fetching clients, please wait ...  </p>
            </div >
        } else {
            content = <div className="zero-items">
                <p> No clients present, kindly add one. </p>
                {clientLink}
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

        let newClientLink;

        if (clients.length !== 0) {
            content =
                <div>
                    <Table
                        tableData={clients}
                        tableFields={tableFields}
                        handleEvent={this.handleEvent}
                        columnWrappers={columnWrappers} />
                    <div>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={PAGE_SZIE}
                            totalItemsCount={totalCount}
                            pageRangeDisplayed={4}
                            onChange={this.pageChanged}
                        />
                    </div>
                </div>
            newClientLink = clientLink

        }
        return (
            <div>
                <div className="content-header">
                    <span className="title"> Clients </span>
                    <span className="pull-right">
                        {newClientLink}
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let {all, loading } = state.clients
    return {
        ...state.clients,
        clients: all,
        loading
        //transactionForm: state.form['transactions-search']
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {

        loadClients(values) {
            dispatch(initGetClients())
            dispatch(getClients(values))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
