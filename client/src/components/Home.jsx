import React, { useState, useEffect} from 'react';
import Login from './Login.jsx';
import Jobs from './Jobs.jsx';
import getUserInfo from './_getUserInfo';

const btnStyle = {
    position: 'absolute',
    top: '2vh',
    left: '93vw'
}

function Home() {

    const token = localStorage.getItem("token");

    const [loggedIn, setLoggedIn] = useState(token);
    const [signInPage, setSignInPage] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect( () => {

    }, [userData])
    
    useEffect( () => {
        let mounted = true;

        getUserInfo(loggedIn)
            .then(userInfo => {
                if (mounted) {
                    localStorage.setItem("token", loggedIn);
                    setUserData(userInfo);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        return () => {
            mounted = false;
        }
    }, [loggedIn])

    const signOut = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
    }

    const signedIn = (
        <React.Fragment>
            <button id="signin" onClick={signOut} style={btnStyle}>Sign Out</button>
            <Jobs userData={userData} setUserData={setUserData}/>
        </React.Fragment>
    )

    const signedOut = (
        <button id="signin" onClick={() => {setSignInPage(true)}} style={btnStyle}>Sign In</button>
    )

    let display;
    if (signInPage) {
        display = <Login setSignInPage={setSignInPage} setLoggedIn={setLoggedIn}/>
    } else {
        display = (
            <div className="display">
                { loggedIn ? signedIn : signedOut }
            </div>
        )
    }

    return (
        <React.Fragment>
            <h1 style={{textAlign: 'center', textDecoration: 'underline'}}>Job Tracker</h1>
            {display}
        </React.Fragment>
    );
}

export default Home;