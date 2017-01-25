import React from 'react';
import { Link } from 'react-router';


const NavLink = (props) => {
    return (
        <Link {...props} activeClassName="active" />
    );
}

const SideBar = (props) => {
    const {links} = props

    let lis = links.all.map((link, idx) => {
        return (
            <li key={idx}>
                <NavLink to={link.link}> <i className={link.icon}></i> {link.text} </NavLink>
            </li>
        )
    });
    return (
        <div className="sidebar">
            <ul className="xp-side-nav-links">
                {lis}
            </ul>
        </div>
    )
}

export default SideBar;