import { connect } from 'react-redux';

import MainPane from '../components/layout/MainPane'

//todo fill body with items from state that should be displayed
const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.notification
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainPane)
export default MainContainer;