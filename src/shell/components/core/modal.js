import React, { Component, PropTypes } from 'react';
import { clearModal } from '../../actions';

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            confirmWasCalled: false
        };
    };

    componentDidMount() {
        var self = this;

        this.$modalElem = $('#app-modal');

        this.$modalElem.on('hidden.bs.modal', (e) => {
            if (self.props.type === 'confirm' && !self.state.confirmWasCalled) {
                self.props.confirm(false);
            }
            this.setState({ display: false, confirmWasCalled: false });
            self.props.onClose && self.props.onClose();
            self.props.dispatch(clearModal());
        });

        this.$modalElem.on('show.bs.modal', (e) => {
            self.setState({ display: true });
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.title !== this.props.title || prevProps.content !== this.props.content) && (this.props.title !== '' && this.props.content !== '')) {
            this.$modalElem.modal('show');
        }
    }

    render() {
        const { content, title, type } = this.props;
        const self = this;

        return (
            <div className="modal fade" id="app-modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="semi-bold modal-title">{title}</h4>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            {type === "info" ? (
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            ) : (
                                    <div className="app-modal-buttons">
                                        <button className="btn btn-default" onClick={(evt) => {
                                            self.props.confirm(true);
                                            self.setState({ confirmWasCalled: true });
                                            self.$modalElem.modal('hide');
                                        } }>OK</button>
                                        <button className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                            self.setState({ confirmWasCalled: true });
                                            self.props.confirm(false)
                                        } }>Cancel</button>
                                    </div>
                                )}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.PropTypes = {
    content: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    type: PropTypes.string.isRequired,
    confirm: PropTypes.func
};
