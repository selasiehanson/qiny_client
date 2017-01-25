import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { hideNotification } from '../../actions';
import jQuery from 'jquery';
let $ = jQuery;
export default class NotificationPanel extends Component {
    constructor(props) {
        super(props);
        this.timer = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notification.display) clearTimeout(this.timer);
    }

    componentDidUpdate() {
        const { display } = this.props.notification;

        if (display) this.timer = setTimeout(() => this.props.dispatch(hideNotification()), 5000);
    }

    render() {
        const { type, content, display } = this.props.notification;
        const classForDisplay = cx('row notify-panel-holder', { 'show': display, hidden: !display });
        const cssForPanel = cx('notify-panel', 'bg-' + (type === 'success' ? 'success' : (type === 'error' ? 'danger' : type)));
        let offset = ($(document).width() / 2) - (400 /2);
        return (
            <div className={classForDisplay} style={{'left': `${offset}px`}}>
                <div className={cssForPanel}>
                    <span className="">{content}</span>
                </div>
            </div>
        );
    }
}

NotificationPanel.PropTypes = {
    notification: PropTypes.object.isRequired
};
