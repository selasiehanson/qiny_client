import React from 'react';
import {Link} from 'react-router';

const Links = (prop) => {
    let link = null;
    if(prop.mode === 'signin') {
        link = <Link to="/signup"> Sign up </Link>;
    }

    if(prop.mode === 'signup') {
        link = <Link to="/signin"> Sign in </Link>;
    }
    
    return (
        <div>
            { link } | <Link to="/password_recovery"> Forgot Password </Link>
            
        </div>
    )
}

export default Links;