import React from 'react';
import NotificationPanel from '../core/notification-panel'


const MainPane = (props) => {
    let {children, dispatch, notification, mode} = props;
    let klasses = "app-content";
    if (mode === 'full') {
        klasses = "container app";
    }
    return (
        <div>
            <NotificationPanel dispatch={dispatch} notification={notification} />
            <div className={klasses}>                
                {children}
            </div>
        </div>
    )
}

export default MainPane;