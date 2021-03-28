import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ApplicationForm from './ApplicatoinForm.jsx';
import ApplicationReadOnly from './ApplicatoinReadOnly.jsx';

const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
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
    
    const [edit, setEdit] = useState(false);

    let job;
    if (edit) {
        job = <ApplicationForm selectedJob={selectedJob}/>
    } else {
        job = <ApplicationReadOnly selectedJob={selectedJob}/>
    }
    
    return ReactDOM.createPortal(
        <div style={overlayStyles}>
            <div style={modalStyles}>
                <button onClick={onClose} style={{position: 'absolute', top: '10px', right: '10px'}}>X</button>
                {job}
                <div className="btnRow" style={{display: 'flex', justifyContent: 'space-between', padding: '20px'}}>
                    <button onClick={() => {setEdit(true)}}>Edit Job</button>
                    <button>Delete Job</button>
                </div>
            </div>
        </div>,
        document.getElementById('jobModal')
    )
}