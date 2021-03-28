import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ApplicationForm from './ApplicatoinForm.jsx';

const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '50px',
    zIndex: '1000'
}
const overlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: '1000'
}

export default function JobModal({selectedJob, onClose}) {

    if (!selectedJob) return null;
    
    return ReactDOM.createPortal(
        <div style={overlayStyles}>
            <div style={modalStyles}>
                <button onClick={onClose}>X</button>
                showing more inner conetent
            </div>
        </div>,
        document.getElementById('jobModal')
    )
}