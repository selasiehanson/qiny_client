import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_SELECTED, SAGA_GET_USER_PROFILE } from '../../constants';
import { hashHistory } from 'react-router';
import { checkAppState } from '../../actions/auth';

class AccountChooser extends Component {

    componentWillMount() {
        this.props.getUserProfile();
    }

    componentWillReceiveProps() {
        if (this.props.app.selectedAccount) {
            hashHistory.transitionTo('dashboard');
        }
    }

    render() {
        let {onAcccountSelected, app} = this.props;
        let accounts;
        if (app.profile) {
            accounts = app.profile.accounts.map((x, idx) => {
                return <a key={idx} href="" onClick={() => onAcccountSelected(x)} className="btn btn-primary"> {x.organization_name} </a>
            });
        }
        return (
            <div className="">
                <div className="content-header">
                    <span className="title"> Select an Account </span>
                </div>
                {accounts}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAcccountSelected(account) {
            dispatch({
                type: ACCOUNT_SELECTED,
                data: account
            })
        },
        getAppState() {
            dispatch(checkAppState());
        },
        getUserProfile() {
            dispatch({
                type: SAGA_GET_USER_PROFILE
            })
        }
    }
}
AccountChooser = connect(mapStateToProps, mapDispatchToProps)(AccountChooser);
export default AccountChooser;