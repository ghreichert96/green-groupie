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
    loginForm: {
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
    }
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "email": "",
            "password": ""
        };

        this.classes = props.classes;

        this.updateFields = this.updateFields.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
    }

    tryLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            console.log(error);
        });
    }

    updateFields(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        return (
            <div className={this.classes.loginForm}>
                <Typography className={this.classes.loginHeader} variant="h2">
                    Log in
                </Typography>
                <TextField className={this.classes.input} id="email" type="email" label="Email address" value={this.state.email} onChange={this.updateFields} />
                <TextField className={this.classes.input} id="password" type="password" label="Password" value={this.state.password} onChange={this.updateFields} />
                <div className={this.classes.submitButtonContainer}>
                    <Button onClick={this.tryLogin} variant="contained" color="primary" type="submit">
                        Log in
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LoginPage);