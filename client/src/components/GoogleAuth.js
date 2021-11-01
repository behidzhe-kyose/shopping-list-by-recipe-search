import React from 'react';
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';


class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '592968066984-af5ollqfijkjoitqompaq1jdp22qdk4l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()

    }

    renderAuthButtons = () => {
        if(this.props.isSignedIn === null) {
            return null
        }
        else if(this.props.isSignedIn) {
            return (
                <Button variant="outlined" startIcon={<GoogleIcon />} color="error" onClick={this.onSignOutClick}>
                    Sign Out
                </Button>
            )
        } else {
            return (
                <Button variant="contained" startIcon={<GoogleIcon />} color="error" onClick={this.onSignInClick}>
                    Sign In
                </Button>
            )
        }
    } 
    render() {
        return (
            <>{this.renderAuthButtons()}</>
        )
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);