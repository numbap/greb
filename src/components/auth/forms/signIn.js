import React from "react";
import logo from './Black logo - no background.png'
import { Link } from "react-router-dom";

const SignIn = (props) => (
    <div>

        {props.error &&
            (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {props.error}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" onClick={props.clearError}>&times;</span>
                    </button>
                </div>
            )}
        <section className="body-sign">
            <div className="center-sign">
                <a href="/" className="logo float-left">
                    <img src={logo} height="54" alt="Porto Admin" />
                </a>

                <div className="panel card-sign">
                    <div className="card-title-sign mt-3 text-right">
                        <h2 className="title text-uppercase font-weight-bold m-0"><i className="bx bx-user-circle mr-1 text-6 position-relative top-5"></i> Sign In</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <label>Username</label>
                            <div className="input-group">
                                <input name="username" onChange={props.onChange} type="text" className="form-control form-control-lg" />
                                <span className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="bx bx-user text-4"></i>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <div className="clearfix">
                                <label className="float-left">Password</label>
                                <Link to="./reset" className="float-right">Lost Password?</Link>
                            </div>
                            <div className="input-group">
                                <input name="password" onChange={props.onChange} type="password" className="form-control form-control-lg" />
                                <span className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="bx bx-lock text-4"></i>
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8">

                            </div>
                            <div className="col-sm-4 text-right">
                                <button type="submit" className="btn btn-primary mt-2" onClick={props.signIn}>Sign In</button>
                            </div>
                        </div>

                        <span className="mt-3 mb-3 line-thru text-center text-uppercase">
                            <span>or</span>
                        </span>

                        <p className="text-center">Don't have an account yet? <Link to="./register">Sign Up!</Link></p>

                    </div>
                </div>

                <p className="text-center text-muted mt-3 mb-3"></p>
            </div>
        </section>



    </div>




)

export default SignIn;
