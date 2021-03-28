import React, { useState, useEffect} from 'react';
import ApplicationForm from './ApplicatoinForm.jsx';
import JobsList from './JobsList.jsx';

const styles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(52, 5px)',
    gridTemplateRows: 'repeat(7, auto)',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    gridGap: '5px 5px',
    padding: '0',
    margin: '5vh 0',
    width: '520px',
    backgroundColor: 'rgba(255, 255, 255, .5)',
}

const styleSq0 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(128, 128, 128, .8)',
    pointerEvents: 'none'
}
const styleSq1 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(139, 0, 0, .8)',
    cursor: 'pointer'
}
const styleSq2 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(255, 165, 0, .8)',
    cursor: 'pointer'
}
const styleSq3 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(255, 255, 0, .8)',
    cursor: 'pointer'
}
const styleSq4 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(0, 128, 0, .8)',
    cursor: 'pointer'
}
const styleSq5 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(0, 255, 0, .8)',
    cursor: 'pointer'
}

export default function Jobs(props) {

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [userDataChange, setUserDataChange] = useState(false)

    useEffect(() => {
        setSelectedJobs([]);
        setUserDataChange(false);
    }, [userDataChange])

    let dates;
    if (props.userData) { dates = props.userData.dates }

    const thisYear = new Date().getFullYear()
    const currentDate = (day) => {
        const first = new Date(`1/1/${thisYear}`).valueOf();
        const singleDay = 86400000;
        const dif = singleDay * day;
        const current = first + dif;
        const currentDate = new Date(current);
        
        const month = currentDate.getMonth()+1;
        const dayDate = currentDate.getDate();
        const year = currentDate.getYear()+1900;

        const date = `${month}/${dayDate}/${year}`

        return date
    }

    const daysOfYear = new Array(365);
    daysOfYear.fill('');
    let days;
    if (dates) {
        days = daysOfYear.map( (day, index) => {
            const date = currentDate(index);
            let applications;
            if (dates && dates[date]) {
                applications = dates[date].length;
            }
            let style = styleSq0;
            if (applications === 0) {
                return <div className='dateSqaure' key={index} style={style}></div>
            } else if (applications === 1) {
                style = styleSq1;
            } else if (applications === 2) {
                style = styleSq2;
            } else if (applications === 3) {
                style = styleSq3;
            } else if (applications === 4) {
                style = styleSq4;
            } else if (applications >= 5) {
                style = styleSq5;
            }
            return <div className='dateSqaure' key={index} style={style} onClick={() => {listApplications(dates[date])}}></div>
        });
        const firstDayOfYear = new Date(`1/1/${thisYear}`).getDay();
        if (firstDayOfYear > 0) {
            days.unshift(
                <div className='dateSqaure' key={-1} style={{gridRow: `${1}/${firstDayOfYear + 1}`, gridColumn: '1 / 1', visibility: 'hidden'}}></div>
            )
        }
    } else {
        days = <div>No Job Data Available</div>
    }

    const listApplications = (applications) => {
        setSelectedJobs(applications);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ApplicationForm setUserData={props.setUserData} />
            <div id="year" style={styles}>
                {days}
            </div>
            <JobsList selectedJobs={selectedJobs} setUserData={props.setUserData} setUserDataChange={setUserDataChange}/>
        </div>

    )
}