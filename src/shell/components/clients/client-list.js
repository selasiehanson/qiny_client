import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../utils/table'
import { Link } from 'react-router';
import { getClients } from '../../actions/clients';
import { hashHistory } from 'react-router';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }
    componentWillMount() {
        this.props.loadClients();
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

    render() {
        let {clients} = this.props;
        let tableFields = [
            { name: 'name', header: "Name" },
            { name: "email", header: "Email" },
            { name: "phone_number", header: "Phone Number" },
            { name: "address", header: "Address" },
            { name: 'view', type: 'action', header: '', action: 'viewClient' },
            { name: 'edit', type: 'action', header: '', action: 'editClient' }
        ];
        let content = <span> No clients present, kindly add one. </span>

        let columnWrappers = {
            view(f) {
                return <span> <i className="fa fa-eye"> </i> </span>
            },
            edit(f) {
                return <span> <i className="fa fa-pencil"> </i> </span>
            }

        }

        if (clients.length !== 0) {
            content = <Table
                tableData={clients}
                tableFields={tableFields}
                handleEvent={this.handleEvent}
                columnWrappers={columnWrappers} />
        }
        return (
            <div>
                <div className="content-header">
                    <span className="title"> Clients </span>
                    <span className="pull-right">
                        <Link to="/clients/new" className="btn btn-primary"> New Client </Link>
                    </span>
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let {all } = state.clients
    return {
        clients: all,
        //transactionForm: state.form['transactions-search']
    }
}


const mapDispatchToProps = (dispatch, state) => {
    return {
        loadClients() {
            dispatch(getClients())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
