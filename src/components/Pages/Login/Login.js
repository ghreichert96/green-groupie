import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

const styles = {
    loginHeader: {
        marginBottom: 25
    },
    signUpHeader: {
        marginBottom: 25
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    signUpForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        marginBottom: 15
    },
    submitButtonContainer: {
        textAlign: 'right'
    },
    signupButtonContainer: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonContainer: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupButton: {
        marginLeft: 15
    },
    loginButton: {
        marginLeft: 15
    }
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "email": "",
            "password": "",
            "signing-up": false,
            "error": false,
            "errorSignUpConfirm": "",
            "errorSignUpEmail": "",
            "errorLoginPassword": ""
        };

        this.classes = props.classes;

        this.updateFields = this.updateFields.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
    }

    tryLogin() {
        this.clearErrors();
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({"errorLoginPassword": error.message});
        });
    }

    updateFields(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    signUp = () => {
        this.setState((state) => {
            return {"signing-up": !state["signing-up"]};
        });
    }

    clearErrors = () => {
        this.setState(
            {
                "errorSignUpConfirm": "",
                "errorSignUpEmail": "",
                "errorLoginPassword": ""
            }
        );
    }

    trySignUp = () => {
        this.clearErrors();

        if (this.state.signUpPassword !== this.state.signUpConfirm) {
            this.setState({"errorSignUpConfirm": "The password and confirmation do not match."});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.signUpPassword).catch((error) => {
            this.setState({"errorSignUpEmail": error.message});
        });
    }

    render() {
        if (this.state["signing-up"]) {
            return (
                <div className={this.classes.signUpForm}>
                    <Typography className={this.classes.signUpHeader} variant="h2">
                        Sign up
                    </Typography>
                    <TextField error={this.state.errorSignUpEmail !== ""} className={this.classes.input} id="email" type="email" label="Email address" value={this.state.email} onChange={this.updateFields} helperText={this.state.errorSignUpEmail} />
                    <TextField className={this.classes.input} id="signUpPassword" type="password" label="Password" value={this.state.signUpPassword} onChange={this.updateFields} />
                    <TextField error={this.state.errorSignUpConfirm !== ""} className={this.classes.input} id="signUpConfirm" type="password" label="Confirm password" value={this.state.signUpConfirm} onChange={this.updateFields} helperText={this.state.errorSignUpConfirm} />
                    <div className={this.classes.submitButtonContainer}>
                        <Button onClick={this.trySignUp} variant="contained" color="primary" type="submit">
                            Sign up
                        </Button>
                    </div>
                    <div className={this.classes.loginButtonContainer}>
                        <Typography variant="subtitle1">Already have an account?</Typography>
                        <Button className={this.classes.loginButton} variant="text" color="secondary" onClick={this.signUp}>Log in</Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={this.classes.loginForm}>
                    <Typography className={this.classes.loginHeader} variant="h2">
                        Log in
                    </Typography>
                    <TextField error={this.state.errorLoginPassword !== ""} className={this.classes.input} id="email" type="email" label="Email address" value={this.state.email} onChange={this.updateFields} />
                    <TextField error={this.state.errorLoginPassword !== ""} className={this.classes.input} id="password" type="password" label="Password" value={this.state.password} onChange={this.updateFields} helperText={this.state.errorLoginPassword} />
                    <div className={this.classes.submitButtonContainer}>
                        <Button onClick={this.tryLogin} variant="contained" color="primary" type="submit">
                            Log in
                        </Button>
                    </div>
                    <div className={this.classes.signupButtonContainer}>
                        <Typography variant="subtitle1">Don't have an account?</Typography>
                        <Button className={this.classes.signupButton} variant="text" color="secondary" onClick={this.signUp}>Sign Up</Button>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(styles)(LoginPage);