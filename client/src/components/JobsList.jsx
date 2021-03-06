import React, { useState, useEffect} from 'react';
import JobModal from './JobModal.jsx';

const style = {
    boxSizing : 'border-box',
    border: 'solid 1px black',
    borderRadius: '30px',
    margin: '1vw',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px 10px #black',
}

export default function JobsList(props) {

    const [selectedJob, setSelectedJob] = useState(false);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        setIndex(props.selectedJobs.indexOf(selectedJob))
    }, [selectedJob])

    const jobs = props.selectedJobs.map((app, index) => {
        return (
            <div className="jobApp" style={style} key={index} onClick={() => {setSelectedJob(app)}}>
                <h2>{app.company}</h2>
                <h3>{app.role}</h3>
            </div>
        )
    });

    return (
        <div id="jobAppList" style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
            {jobs}
            <JobModal selectedJob={selectedJob} setUserData={props.setUserData} setUserDataChange={props.setUserDataChange} onClose={() => setSelectedJob(false)} date={props.date} index={index}/>
        </div>
    )
}

