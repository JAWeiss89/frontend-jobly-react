import React from 'react';
import './styles/MessageBox.css';

const MessageBox = ( {message} ) => {

    return (message && 
        <div className="MessageBox"><p>{message}</p></div>
    )
}

export default MessageBox;