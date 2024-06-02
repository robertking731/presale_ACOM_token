import React from 'react';

const TimeInfoCard = (props) => {
    return (
        <div style={{
            backgroundColor: 'yellowgreen',
            width: '20%',
            color: 'white',
            borderRadius: '3px',
            padding: '5px',
            marginLeft: '20px',
            fontSize: '25px'
        }}>
            <h1>{props.value}</h1>
            <h4 style={{color: 'yellow'}}>{props.unit}</h4>
        </div>
    )
}

export default TimeInfoCard;