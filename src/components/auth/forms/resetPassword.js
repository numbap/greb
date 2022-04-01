import React from "react";
import logo from './Black logo - no background.png'

const ResetPassword = (props) => (
    <div className="row">

        <section className="body-sign">
            <div className="center-sign">
                <a href="/" className="logo float-left">
                    <img src={logo} height="54" alt="VouchIt" />
                </a>

                <div className="panel card-sign">
                    <div className="card-title-sign mt-3 text-right">
                        <h2 className="title text-uppercase font-weight-bold m-0"><i className="bx bx-user-circle mr-1 text-6 position-relative top-5"></i> Recover Password</h2>
                    </div>
                    <div className="card-body">

                        {props.error &&
                            (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {props.error}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true" onClick={props.clearError}>&times;</span>
                                    </button>
                                </div>
                            )}
                        <div className="alert alert-info">
                            <p className="m-0">Enter your e-mail below and we will send you reset instructions!</p>
                        </div>

                        <div className="form-group mb-0">
                            <div className="input-group">
                                <input name="username" type="email" placeholder="E-mail" class="form-control form-control-lg" onChange={props.onChange} />
                                <span className="input-group-append">
                                    <button className="btn btn-primary btn-lg" onClick={props.resetPassword}>Reset!</button>
                                </span>
                            </div>
                        </div>

                        <p className="text-center mt-3">Remembered? <a href="pages-signin.html">Sign In!</a></p>
                    </div>
                </div>

                <p class="text-center text-muted mt-3 mb-3"></p>
            </div>
        </section>

    </div>
)
export default ResetPassword;



// <div className="col-md-3"></div>
// <div className="col-md-6">
//     <div className="text-center"><img src={logo} alt="logo" height="35" /></div>
//     <h1>Forgot Your Password?</h1>
//     <p>Enter your username, and we'll help you reset your password.</p>
//     {props.error && 
//         (
//             <div className="alert alert-danger alert-dismissible fade show" role="alert">
//             {props.error}
//             <button type="button" className="close" data-dismiss="alert" aria-label="Close">
//                 <span aria-hidden="true" onClick={props.clearError}>&times;</span>
//             </button>
//             </div>
//         )}
//     <div className="form-group">
//         <label htmlFor="username">User Name</label>
//         <input name="username" className="form-control" onChange={props.onChange} placeholder="username" />
//     </div>
//     <div className="form-group">
//         <button className="btn btn-primary" onClick={props.resetPassword}>Reset Password</button>
//     </div>
// </div>
// <div className="col-md-3"></div>