import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {renderInput} from '../utils/forms';
import { connect } from 'react-redux';
import Links from './auth-links';

const validate = (values) => {
    const errors = {};

    if (!values.first_name) {
        errors.first_name = 'Please provide a first_name.'
    }

    if (!values.last_name) {
        errors.last_name = 'Please provide a last name.'
    }

    if (!values.email) {
        errors.email = 'Please provide an email.'
    }

    if (!values.organization_name) {
        errors.organization_name = 'Please provide an organization name.'
    }

    if (!values.password) {
        errors.password = 'Please provide a password.'
    }

    if(values.password !== values.password_confirmation ){
        errors.password = "Password and confirmation don't match."
        errors.password_confirmation = 'Please provide a password.'
    }

    return errors;
}

const Form = ({params, signIn , handleSubmit, invalid, submitting}) => {
    return (
        <div className=" container auth-container">            
            <div className="clearfix">
                <div className="col-md-3"> </div>                
                <div className="col-md-6 box">
                    <div className="col-md-12">
                        <div className="title"> Create your XPED account</div>
                    </div>
                    <form onSubmit={handleSubmit(signIn)} className="clearfix">
                        <div className="clearfix">
                            <div className="col-md-6"> 
                                <Field name="first_name" component={renderInput} placeholder="First Name" />
                            </div>
                            <div className="col-md-6"> 
                                <Field name="last_name" component={renderInput} placeholder="Last Name"  className="col-md-6"/>
                            </div>                            
                        </div>
                        <div className="col-md-12">
                            <Field name="email" component={renderInput} placeholder="Email" />
                        </div>
                        <div className="col-md-12">
                            <Field name="organization_name" component={renderInput} placeholder="Name of organization" />
                        </div>
                        <div className="clearfix">
                            <div className="col-md-6"> 
                                <Field name="password" component={renderInput} placeholder="Password" type="password" />
                            </div>
                            <div className="col-md-6"> 
                                <Field name="password_confirmation" component={renderInput} placeholder="Confirm Password" type="password" />        
                            </div>
                        </div>   
                        <div className="col-md-12">
                            <div className="pull-right form-buttons">
                                <button type="submit" className="btn btn-success"> Sign In </button>
                            </div>
                        </div>
                    </form>
                    <div className="clearfix">
                        <div className="col-md-12">
                            <Links mode="signup" />
                        </div>
                    </div>
                </div>            
                <div className="col-md-3"> </div>
            </div>
            
        </div>        
    );
}

let RegisterForm = reduxForm({
    form: 'signup',
    validate
})(Form);

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn(credentials){

        }
    }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)


export default Register;