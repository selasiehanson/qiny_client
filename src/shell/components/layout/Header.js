import React from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';


const Header = (props) => {
    const {appName} = props.header;
    const {logout, toggleSideBar} = props
    let organizationView;
    if (props.app.selectedAccount) {
        organizationView = <span> {props.app.selectedAccount.organization_name} </span>
    }
    const onToggleSideBar = (e) => {
        toggleSideBar();
        e.preventDefault();
    };

    const onLogout = (e) => {
        logout();
        e.preventDefault();
    };
    return (
        <div className="header">
            <div className="clearfix">
                <div className="pull-left"> {appName}  </div>
                <span> <a href="" onClick={onToggleSideBar} className="sidebar-toggler"> <i className="fa fa-navicon"></i> </a> </span>
                <div 
                    className="pull-right app-user"> 
                    Kwesi @ {organizationView} | <a href="" onClick={onLogout} 
                    to="/logout"> Log out </a> 
                </div>
            </div>
        </div>
    )
}


export default Header;