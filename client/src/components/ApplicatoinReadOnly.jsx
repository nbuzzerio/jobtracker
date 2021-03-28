import React, { useState, useEffect} from 'react';
import postApplication from './_postApplication';

export default function ApplicationForm(props) {

    const token = localStorage.getItem("token");

    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [link, setLink] = useState('');
    const [board, setBoard] = useState('');
    const [contact, setContact] = useState({
        name: '',
        email: '',
        role: '',
        notes: '',
        linkedInProfile: ''
    });
    const [applicationError, setApplicationError] = useState(false);


    useState(() => {
        if (props.selectedJob) {
            const job = props.selectedJob
            setCompany(job.company);
            setRole(job.role);
            setLink(job.link);
            setBoard(job.board);
            setContact({
                name: job.contact.name,
                email: job.contact.email,
                role: job.contact.role,
                notes: job.contact.notes,
                linkedInProfile: job.contact.linkedInProfile
            });
        }
    }, [])

    const handleApplicationSubmit = (e) => {
        e.preventDefault();

        const job = {};
        job.company = company;
        job.role = role;
        job.link = link;
        job.board = board;
        job.contact = contact;

        let mounted = true;

        postApplication(job, token)
            .then( (userInfo) => { 
                if (mounted) {
                    setCompany('');
                    setRole('');
                    setLink('');
                    setBoard('');
                    setContact({
                        name: '',
                        email: '',
                        role: '',
                        notes: '',
                        linkedInProfile: ''
                    });
                    setApplicationError(false);
                    props.setUserData(userInfo);
                }   
            })
            .catch(err => {
                setApplicationError(err.response.data);
            })
    }

    let applicationWarning;

    if (!applicationError) {
        applicationWarning = <span></span>
    } else {
        applicationWarning = <div style={{color: 'red'}}>{applicationError}</div>
    }

    return (
        <form id="application" onSubmit={handleApplicationSubmit} style={{display: 'flex', flexDirection: 'column', width: '400px'}}>
            <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{props.selectedJob.role} Application</h2>
            <h2 style={{textAlign: 'center', textTransform: 'capitalize', marginTop: '0'}}> For {props.selectedJob.company}</h2>
            <label>
            Company:
            </label>
            <input type="text" value={company} style={{pointerEvents: 'none'}}></input>
            <label>
            Job Role:
            </label>
            <input type="text" value={role} style={{pointerEvents: 'none'}}></input>
            <label>
            Job Link:
            </label>
            <input type="text" value={link} style={{pointerEvents: 'none'}}></input>
            <label>
            Job Board:
            </label>
            <input type="text" value={board} style={{pointerEvents: 'none'}}></input>
            <h3>Job Contact</h3>
            <label>
            Contact Name:
            </label>
            <input type="text" value={contact.name} name='name' style={{pointerEvents: 'none'}}></input>
            <label>
            Contact Email:
            </label>
            <input type="text" value={contact.email} name='email' style={{pointerEvents: 'none'}}></input>
            <label>
            Contact Role:
            </label>
            <input type="text" value={contact.role} name='role' style={{pointerEvents: 'none'}}></input>
            <label>
            Notes:
            </label>
            <input type="text" value={contact.notes} name='notes' style={{pointerEvents: 'none'}}></input>
            <label>
            Contact linkedInProfile:
            </label>
            <input type="text" value={contact.linkedInProfile} name='linkedInProfile' style={{pointerEvents: 'none'}}></input>
        </form>
    )
}