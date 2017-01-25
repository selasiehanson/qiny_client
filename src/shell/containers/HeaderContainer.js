import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Header from '../components/layout/Header'
import { signout } from '../actions/auth';

//todo fill body with items from state that should be displayed
const mapStateToProps = (state) => {
    return {
        header: state.header,
        app: state.app
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleSibdeBar() {

        },
        logout() {
            dispatch(signout())
            hashHistory.push('/signin')
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
export default HeaderContainer;