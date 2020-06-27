import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Alert } from "react-bootstrap";
import { authenticationService } from '../services/authentication.service';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Alert variant="success">
                    <strong>Normal User</strong> UserName: user Password: user<br />
                    <strong>Administrator</strong> UserName: admin Password: admin
                </Alert >
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = { from: { pathname: "/todoList" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                            </div>
                            {status &&
                                <Alert variant="danger">{status}</Alert>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default LoginPage;