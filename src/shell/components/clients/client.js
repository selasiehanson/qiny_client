import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { renderInput } from '../utils/forms';
import { connect } from 'react-redux';
import { addClient, cacheClient, getClient, showNewClient, updateClient } from '../../actions/clients';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { showClientSavedMsg } from '../../actions/clients';

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Please provide a name.'
    }

    if (!values.email) {
        errors.email = 'Please provide an email.'
    }

    if (!values.phone_number) {
        errors.phone_number = 'Please provide a phone number.'
    }

    if (!values.address) {
        errors.address = 'Please provide an address.'
    }

    return errors;
}


const Form = ({params, onSaveClient, handleSubmit, invalid, pristine, submitting}) => {
    let formMode = params.id ? 'Update' : 'New';
    let buttonMode = params.id ? 'Update' : 'Create';
    return (
        <div className="clearfix">
            <div className="content-header">
                <span className="title"> {formMode} Client </span>
            </div>
            <div className="col-md-3"> </div>
            <div className="col-md-6">
                <form onSubmit={handleSubmit(onSaveClient)}>
                    <Field name="name" component={renderInput} placeholder="Full Name" />
                    <Field name="email" component={renderInput} placeholder="Email" />
                    <Field name="phone_number" component={renderInput} placeholder="Phone Number" />
                    <Field name="address" component={renderInput} placeholder="Address" />
                    <div className="pull-right form-buttons" >
                        <Link to="/clients" className="btn btn-default" > Cancel </Link>
                        <button type="submit" className="btn btn-success" disabled={pristine || submitting}> {buttonMode} Client </button>
                    </div>
                </form>
            </div>
            <div className="col-md-3"> </div>
        </div >
    );
}

let ClientForm = reduxForm({
    form: 'client',
    enableReinitialize: false,
    validate
})(Form);

class ClientContainer extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let id = this.props.params.id;
        if (id) {
            this.props.getClient(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.params.id && !_.isEqual(nextProps.current, {})) {
            nextProps.showNewClient();
        }

        if (nextProps.afterSave) {
            if (nextProps.successfullySaved) {
                nextProps.showSavedMessage(nextProps.mode);
            }
        }
    }

    goToClients() {
        hashHistory.push('clients');
    }

    render() {

        return (
            <div>
                <ClientForm  {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.clients,
        initialValues: state.clients.current
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
        getClient(id) {
            dispatch(getClient(id));
        },
        showSavedMessage(mode) {
            dispatch(showClientSavedMsg(mode));
        },
        showNewClient() {
            dispatch(showNewClient())
        },
        onSaveClient(client) {
            dispatch(cacheClient(client));
            if (client.id) {
                dispatch(updateClient(client));
            } else {
                dispatch(addClient(client));
            }
        }
    }
}

const Client = connect(mapStateToProps, mapDispatchToProps)(ClientContainer)
export default Client;