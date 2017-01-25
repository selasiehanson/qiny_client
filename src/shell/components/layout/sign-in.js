import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderInput } from '../utils/forms';
import { connect } from 'react-redux';
import Links from './auth-links';
import { signin } from '../../actions/auth';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please provide an email.'
    }

    if (!values.password) {
        errors.password = 'Please provide a password.'
    }

    return errors;
}

const Form = ({params, signIn, handleSubmit, pristine, submitting}) => {
    return (
        <div className=" container auth-container">
            <div className="col-md-12">
                <div className="clearfix">
                    <div className="col-md-3"> </div>
                    <div className="col-md-6 box">
                        <div className="col-md-12">
                            <div className="title"> Sign in to your XPED account</div>

                            <form onSubmit={handleSubmit(signIn)} className="clearfix">
                                <Field name="email" component={renderInput} placeholder="Email" />
                                <Field name="password" component={renderInput} placeholder="Password" type="password" />
                                <div className="pull-right form-buttons" >
                                    <button type="submit" className="btn btn-success" disabled={pristine || submitting}> Sign In </button>
                                </div>
                            </form>
                            <div className="clearfix">
                                <Links mode="signin" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"> </div>
                </div>
            </div>
        </div>
    );
}

let SignInForm = reduxForm({
    form: 'signin',
    validate
})(Form);

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn(credentials) {
            dispatch(signin(credentials));
        }
    }
}

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInForm)

export default SignIn;