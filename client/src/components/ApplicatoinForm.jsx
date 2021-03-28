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

    const handleCompanyChange = e => setCompany(e.target.value);
    const handleRoleChange = e => setRole(e.target.value);
    const handleLinkChange = e => setLink(e.target.value);
    const handleBoardChange = e => setBoard(e.target.value);
    const handleContactChange = e => {
        let newContact = {...contact}
        newContact[e.target.name] = e.target.value
        setContact(newContact);
    }

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
            <h2 style={{textAlign: 'center'}}>Job Application</h2>
            <label>
            Company:
            </label>
            <input type="text" value={company} onChange={handleCompanyChange}></input>
            <label>
            Job Role:
            </label>
            <input type="text" value={role} onChange={handleRoleChange}></input>
            <label>
            Job Link:
            </label>
            <input type="text" value={link} onChange={handleLinkChange}></input>
            <label>
            Job Board:
            </label>
            <input type="text" value={board} onChange={handleBoardChange}></input>
            <h3>Job Contact</h3>
            <label>
            Contact Name:
            </label>
            <input type="text" value={contact.name} name='name' onChange={handleContactChange}></input>
            <label>
            Contact Email:
            </label>
            <input type="text" value={contact.email} name='email' onChange={handleContactChange}></input>
            <label>
            Contact Role:
            </label>
            <input type="text" value={contact.role} name='role' onChange={handleContactChange}></input>
            <label>
            Notes:
            </label>
            <input type="text" value={contact.notes} name='notes' onChange={handleContactChange}></input>
            <label>
            Contact linkedInProfile:
            </label>
            <input type="text" value={contact.linkedInProfile} name='linkedInProfile' onChange={handleContactChange}></input>
            <input type="submit" value="Submit"></input>
            {applicationWarning}
        </form>
    )
}