import React, { useState, useEffect} from 'react';
import ApplicationForm from './ApplicatoinForm.jsx';

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
    backgroundColor: 'rgba(128, 128, 128, .8)'
}
const styleSq1 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(139, 0, 0, .8)'
}
const styleSq2 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(255, 165, 0, .8)'
}
const styleSq3 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(255, 255, 0, .8)'
}
const styleSq4 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(0, 128, 0, .8)'
}
const styleSq5 = {
    border: 'solid 1px black',
    borderSizing: 'border-box',
    width: '5px',
    height: '5px',
    backgroundColor: 'rgba(0, 255, 0, .8)'
}

export default function Jobs(props) {

    let dates;
    if (props.userData) { dates = props.userData.dates }


    const currentDate = (day) => {
        const first = new Date('1/1/2021').valueOf();
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

    const daysOfYear = new Array(364);
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
            if (applications === 1) {
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
            return <div className='dateSqaure' key={index} style={style}></div>
        });
    } else {
        days = <div>No Job Data Available</div>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ApplicationForm setUserData={props.setUserData} />
            <div id="year" style={styles}>
                {days}
            </div>
        </div>

    )
}