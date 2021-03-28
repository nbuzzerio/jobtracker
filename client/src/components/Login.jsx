import React, { useState, useEffect} from 'react';
import postNewUser from './_postNewUser';
import postExistingUser from './_postExistingUser';

export default function Login(props) {
    const [newUser, setNewUser] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [newUserError, setUserError] = useState(false);
    
    const handleNewUserSubmit = (e) => {
        e.preventDefault();
        
        let mounted = true;
        if(password === passwordConfirm && password !== '') {
            postNewUser(name, email, password)
                .then( (res) => { 
                    if (mounted) {
                        props.setSignInPage(false); 
                        props.setLoggedIn(res.headers['x-auth-token']); 
                    }
                })
                .catch(err => {
                    setUserError(err.response.data);
                })
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handleExistingUserSubmit = (e) => {
        e.preventDefault();
        
        let mounted = true;
        postExistingUser(email, password)
                .then( (res) => { 
                    if (mounted) {
                        props.setSignInPage(false)
                        props.setLoggedIn(res.headers['x-auth-token']);  
                    }  
                })
                .catch(err => {
                    setUserError(err.response.data);
                })
    };

    let passwordWarning;
    let newUserErrorWarning;

    if (passwordMatch) {
        passwordWarning = <span></span>
    } else {
        passwordWarning = <div style={{color: 'red'}}>Passwords do not match</div>
    }
    if (!newUserError) {
        newUserErrorWarning = <span></span>
    } else {
        newUserErrorWarning = <div style={{color: 'red'}}>{newUserError}</div>
    }

    const handleNameChange = e => setName(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handlePasswordConfirmChange = e => setPasswordConfirm(e.target.value);

    const newForm = (
        <React.Fragment>
            <h2 style={{textAlign: 'center'}}>Sign Up</h2>
            <form onSubmit={handleNewUserSubmit} style={{display: 'flex', flexDirection: 'column', margin: '0 35%'}}>
                <label>
                Name:
                </label>
                <input type="text" value={name} onChange={handleNameChange}></input>
                <label>
                Email:
                </label>
                <input type="text" value={email} onChange={handleEmailChange}></input>
                <label>
                Password:
                </label>
                <input type="password" value={password} onChange={handlePasswordChange}></input>
                <label>
                Confirm Password:
                </label>
                <input type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange}></input>
                {passwordWarning}
                <input type="submit" value="Submit"></input>
                {newUserErrorWarning}
            </form>
        </React.Fragment>
    );
    const existingForm = (
        <React.Fragment>
            <h2 style={{textAlign: 'center'}}>Sign In</h2>
            <form onSubmit={handleExistingUserSubmit} style={{display: 'flex', flexDirection: 'column', margin: '0 35%'}}>
                <label>
                Email:
                </label>
                <input type="text" value={email} onChange={handleEmailChange} autoComplete></input>
                <label>
                Password:
                </label>
                <input type="password" value={password} onChange={handlePasswordChange} autoComplete></input>
                <input type="submit" value="Submit"></input>
                <input type="button" onClick={() => setNewUser(true)} value='New User'></input>
                {newUserErrorWarning}
            </form>
        </React.Fragment>
    );

    return (
      <React.Fragment>
        {newUser ? newForm : existingForm} 
      </React.Fragment>
    )
}