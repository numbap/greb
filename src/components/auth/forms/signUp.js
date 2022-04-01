import React from "react";
import logo from './Black logo - no background.png'
import { Link } from "react-router-dom";
import video from './ScreenSlideShort.m4v'



const SignUp = (props) => (
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">

        <div className="text-center py-3"><img src={logo} alt="logo" height="35" /></div>
        <section class="card card-featured-primary card-featured">
            <div class="card-body">
                <h1>Sign Up</h1>
                <p>Register for instant access to VouchIt's powerful behavioral geofencing capabilities.</p>
                
                {props.error && 
                    (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {props.error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={props.clearError}>&times;</span>
                        </button>
                        </div>
                    )}
                <div className="form-group">
                    <label for="username">User Name</label>
                    <input name="username" className="form-control" onChange={props.onChange} placeholder="username" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input name="password" className="form-control" type="password" onChange={props.onChange} placeholder="password" />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input name="email" type="email" className="form-control" onChange={props.onChange} placeholder="email" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={props.signUp}>Sign Up</button>
                </div>
                <p><Link to="/">Sign In</Link></p>
                <div><video className="img-fluid border border-secondary rounded" src="https://vouch.it/wp-content/uploads/2021/04/ScreenSlideShort-1.m4v" autoplay="true" width="550" loop="true" muted="muted" controlsList="nodownload"></video></div>
            </div>
        </section>

        

        </div>
        <div className="col-md-3"></div>
    </div>
)

export default SignUp;