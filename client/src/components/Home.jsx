import React, { useState, useEffect} from 'react';
import Login from './Login.jsx';
import Jobs from './Jobs.jsx';

function Home() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

    const signOut = () => setLoggedIn(false);

    const signedIn = (
        <React.Fragment>
            <button id="signin" onClick={signOut}>Sign Out</button>
            <Jobs />
        </React.Fragment>
    )

    const signedOut = (
        <button id="signin" onClick={() => {setSignInPage(true)}}>Sign In</button>
    )

    let display;
    if (signInPage) {
        display = <Login setSignInPage={setSignInPage}/>
    } else {
        display = (
            <div className="display">
                { loggedIn ? signedIn : signedOut }
            </div>
        )
    }

    return (
        <React.Fragment>
            <h1 style={{textAlign: 'center'}}>
                --------------------------------------
                Job Tracker
                --------------------------------------
            </h1>
            {display}
        </React.Fragment>
    );
}

export default Home;