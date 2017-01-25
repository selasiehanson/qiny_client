import React from 'react';
import ReactDOM from 'react-dom';

export default class DatePicker extends React.Component {
    render() {
        const { name, meta, input, placeholder } = this.props;
        return (
            <div className="form-group">
                <div className="controls">
                    <label>{placeholder}</label>
                    <div className="input-group">
                        <input id={name} type='text' ref='date' className="form-control u-full-width" {...input} />
                        <label htmlFor={name} className="input-group-addon btn"><i
                            className="fa fa-calendar"></i>
                        </label>
                    </div>
                    {meta.error && meta.touched && <span className="text-danger"> {meta.error} </span>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.date))
            .datepicker({ dateFormat: 'yy-mm-dd' });
        $(ReactDOM.findDOMNode(this.refs.date))
            .on('change', this.handleChange.bind(this))
    }

    componentWillUnmount() {
    }

    handleChange(e) {
        e.preventDefault();
        let date = ReactDOM.findDOMNode(this.refs.date).value
        this.props.input.onChange(date);
    }
}