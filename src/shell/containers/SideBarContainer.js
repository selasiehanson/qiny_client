import { connect } from 'react-redux';

import SideBar from '../components/layout/SideBar'

//todo fill body with items from state that should be displayed
const mapStateToProps = (state) => {
    return {
        links: state.links
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar)
export default SideBarContainer;