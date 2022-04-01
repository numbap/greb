import React from "react";
import saussage from './saussage.jpeg'
import logo from './Black logo - no background.png'
import email from './gotmail.jpeg'

const ResetPassword2 = (props) => (

    <section className="body-sign">
    <div className="center-sign">
        <a href="/" className="logo float-left"><img src="/static/media/Black logo - no background.7270276f.png" height="54" alt="Porto Admin" /></a>
        <div className="panel card-sign">
            <div className="card-title-sign mt-3 text-right">
                <h2 className="title text-uppercase font-weight-bold m-0">
                <i className="bx bx-user-circle mr-1 text-6 position-relative top-5"></i>Password Reset</h2>
        </div>        
        <div className="card-body"><div className="form-group mb-3">

        {props.error && 
            (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {props.error}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" onClick={props.clearError}>&times;</span>
                </button>
                </div>
            )}

        <label>Username</label>
        <div className="input-group">
            <input name="username" type="text" className="form-control form-control-lg" onChange={props.onChange} />
            <span className="input-group-append">
                <span className="input-group-text">
                    <i className="bx bx-user text-4"></i>
                </span>
            </span>
        </div>
    </div>
    <div className="form-group mb-3">
        <label>New Password</label>
        <div className="input-group">
            <input name="new_password" type="text" className="form-control form-control-lg" onChange={props.onChange} />
            <span className="input-group-append">
                <span className="input-group-text">
                    <i className="bx bx-lock text-4"></i>
                </span>
            </span>
        </div>
    </div>
    <div className="form-group mb-3">
        <label>Confirmation Code</label>
        <div className="input-group">
            <input name="code" type="text" className="form-control form-control-lg" onChange={props.onChange} />
            <span className="input-group-append">
                <span className="input-group-text">
                    <i className="bx bx-envelope-open text-4"></i>
                </span>
            </span>
        </div>
    </div>
    <div className="form-group mb-3">

    </div>
    <div className="row">
            <div className="col-sm-8"></div>
            <div className="col-sm-4 text-right">
                <button type="submit" className="btn btn-primary mt-2" onClick={props.resetPassword2}>Sign In</button>
            </div>
    </div>
           </div>
        </div>
        <p className="text-center text-muted mt-3 mb-3"></p>
    </div>
    </section>




)

export default ResetPassword2;





// <div className="row">
// <div className="col-md-3"></div>
// <div className="col-md-6">
//     <div className="text-center"><img src={logo} alt="logo" height="35" /></div>
//     <h1>Reset Password</h1>
//     <div><img src={email} width="300" className="img-fluid rounded" alt="check mail" /><br /><br /></div>
//     <p>We've just sent a password reset code to your inbox. You can use this code to choose a new password for your account.</p>
//     <p>If you don't see the email, please check your Spam folder, and whitelist our email address.</p>

    // {props.error && 
    //     (
    //         <div className="alert alert-danger alert-dismissible fade show" role="alert">
    //         {props.error}
    //         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    //             <span aria-hidden="true" onClick={props.clearError}>&times;</span>
    //         </button>
    //         </div>
    //     )}
//     <div className="form-group">
//         <label htmlFor="username">User Name</label>
//         <input name="username" className="form-control" onChange={props.onChange} placeholder="username" />
//     </div>
//     <div className="form-group">
//         <label htmlFor="new_password">New Password</label>
//         <input name="new_password" className="form-control" type="password" onChange={props.onChange} placeholder="new password" />
//     </div>
//     <div className="form-group">
//         <label htmlFor="email">Code</label>
//         <input name="code" className="form-control" onChange={props.onChange} placeholder="code" />
//     </div>
//     <div className="form-group">
//         <button className="btn btn-primary" onClick={props.resetPassword2}>Reset Password</button>
//     </div>
// </div>
// <div className="col-md-3"></div>
// </div>