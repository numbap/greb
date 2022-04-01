import React, {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import SignUp from './forms/signUp';
import SignIn from './forms/signIn';
import ConfirmSignUp from './forms/confirmSignup';
import SignedIn from './forms/signedIn'
import SignedOut from './forms/signedOut'
import ResetPassword from './forms/resetPassword'
import ResetPassword2 from './forms/resetPassword2'
import Viz from '../visualizations/viz'
import SEO from '../seo/seo'
import App from '../../App'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect, 
  } from "react-router-dom";
  import * as ReactGA_UA from "react-ga";
  import ReactGA from "react-ga4";
import dotenv from 'dotenv'

// dotenv.config()

// console.log(process.env)

const FormsSwapper = (props) => {

    const initialFormState = {
        errorMessage: null,
        username: '',
        password: '',
        email: '',
        authCode: '',
        code: '',
        new_password: '',
        formType: '',
        phone: ''
    
    }

    const [formState, updateFormState] = useState(initialFormState)
    const [user, updateUser] = useState(null)

    useEffect(() => {
        checkUser()
        setAuthListener()
    }, [])


    ReactGA.initialize(process.env.REACT_APP_GA_MAIN);
    ReactGA_UA.initialize(process.env.REACT_APP_GA_UA);

    function onChange(e) {
        e.persist()
        updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
    }


    async function setAuthListener() {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
              case 'signOut':
                updateFormState(() => ({...formState, formType: 'homeRoot'}))
                updateFormState(() => ({...formState, formType: 'signIn'}))
                  break;
                default :

        }});
    }

    async function checkUser () {
        try{
            const user = await Auth.currentAuthenticatedUser()
            updateFormState(() => ({...formState, formType: 'signedIn', errorMessage: null}))
             updateUser(user)
        }catch(e){
            console.log(e)
        }
    }

    async function clearError(){
        updateFormState(() => ({...formState, errorMessage: null}))
    }

    async function signUp() {
        const { username, email, password, phone } = formState; 
        try{
            await Auth.signUp({username, password, phone, attributes: {email} })
            await ReactGA.event({
                category: "sign_up",
                action: "sign_up",
                label: "sign_up", // optional
                value: 1, // optional, must be a number
                nonInteraction: true, // optional, true/false
                transport: "xhr", // optional, beacon/xhr/image
              });

              await ReactGA_UA.event({
                category: 'Ecommerce',
                action: 'Sign Up',
                label: '...',
                value: 1
              });

            await clearError()
            await updateFormState(() => ({...formState, formType: 'confirmSignUp', errorMessage: null}))
        }catch(e){
            updateFormState(() => ({...formState, errorMessage: e.message}))
        }

    }

    async function confirmSignUp() {
        const { username, authCode } = formState; 
        try {
            await Auth.confirmSignUp(username, authCode)
            await ReactGA.event({
                category: "sign_up_confirm",
                action: "sign_up_confirm",
                label: "sign_up_confirm", // optional
                value: 1, // optional, must be a number
                nonInteraction: true, // optional, true/false
                transport: "xhr", // optional, beacon/xhr/image
              });

              await ReactGA_UA.event({
                category: 'Ecommerce',
                action: 'Sign Up Confirm',
                label: '...',
                value: 1
              });
            await clearError()
            updateFormState(() => ({...formState, formType: 'signIn', errorMessage: null}))
        }catch(e){
            updateFormState(() => ({...formState, errorMessage: e.message}))
        }

    }

    async function signIn() {
        const { username, password } = formState;
        try{
            await Auth.signIn(username, password)
            await ReactGA.event({
                category: "login",
                action: "login",
                label: "login", // optional
                value: 1, // optional, must be a number
                nonInteraction: true, // optional, true/false
                transport: "xhr", // optional, beacon/xhr/image
              });
              await ReactGA_UA.event({
                category: 'Ecommerce',
                action: 'Login',
                label: '...',
                value: 1
              });

            await clearError()
            updateFormState(() => ({...formState, formType: 'signedIn', errorMessage: null}))
        }catch(e){
            updateFormState(() => ({...formState, errorMessage: e.message}))
        }

    }

    async function signOut() {
        await Auth.signOut()
        updateFormState(() => ({...formState, formType: 'homeRoot', errorMessage: null}))
        // updateFormState(() => ({...formState, formType: 'signedOut'}))
    }

    async function resetPassword() {
        const { username, password } = formState; 
        try{
            await Auth.forgotPassword(username)
            await clearError()
            updateFormState(() => ({...formState, formType: 'resetPassword2', errorMessage: null}))
        }catch(e){
            updateFormState(() => ({...formState, errorMessage: e.message}))
        }

    }   

    async function resetPassword2() {
        try{        
            const { username, code, new_password } = formState; 
            await Auth.forgotPasswordSubmit(username, code, new_password)
            await ReactGA.event({
                category: "reset_password",
                action: "reset_password",
                label: "reset_password", // optional
                value: 1, // optional, must be a number
                nonInteraction: true, // optional, true/false
                transport: "xhr", // optional, beacon/xhr/image
              });
              await ReactGA_UA.event({
                category: 'Ecommerce',
                action: 'Reset Password',
                label: '...',
                value: 1
              });
            await clearError()
            updateFormState(() => ({...formState, formType: 'resetComplete', errorMessage: null}))
         }catch(e){
            updateFormState(() => ({...formState, errorMessage: e.message}))
        }

    }   

    const {formType} = formState

    return (
    <Router  >
        <Switch >
            <Route path="/s/:seoString" exact >
                <SEO />
            </Route>
            <Route path="/visualizations" exact >
                <Viz />
            </Route>
           <Route path = "/" exact>
                {
                    formType === 'signedIn' ? (
                        <App/>
                    ) : (
                        <SignIn onChange={onChange} clearError={clearError} error={formState.errorMessage} signIn={signIn}  />
                    )
                }
           </Route> 
           <Route path = "/register" exact>
                {
                    formType === 'confirmSignUp' ? (
                        <Redirect to={`/register-confirm`} />
                    ) : (
                        <SignUp onChange={onChange} clearError={clearError} error={formState.errorMessage} signUp={signUp}  />
                    )
                }
           </Route>
           <Route path = "/register-confirm" exact >
                {
                    formType === 'signIn' ? (
                        <Redirect to={`/`} />
                    ) : (
                        <ConfirmSignUp clearError={clearError} error={formState.errorMessage} onChange={onChange} confirmSignUp={confirmSignUp} />
                    )
                }           
           </Route>
           <Route path = "/reset" exact>
                {
                    formType === 'resetPassword2' ? (
                        <Redirect to={`/reset-confirm`} />
                    ) : (
                        <ResetPassword clearError={clearError} error={formState.errorMessage} onChange={onChange} resetPassword={resetPassword} />
                    )
                } 
           </Route>
            <Route path = "/reset-confirm" exact>
                {
                    formType === 'resetComplete' ? (
                        <Redirect to={`/`} />
                    ) : (
                        <ResetPassword2 clearError={clearError} error={formState.errorMessage} onChange={onChange} resetPassword2={resetPassword2} />
                    )
                } 
            </Route>
        </Switch>
     </Router>


    )
}

export default FormsSwapper;


