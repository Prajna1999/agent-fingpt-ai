// ChatButton.js

// import React from 'react';
import './ChatButton.css';

// eslint-disable-next-line react/prop-types
const ChatButton = ({ onClick }) => {
    return (
        <div className="chat-button" onClick={onClick}>
            Chat
        </div>
    );
};


export default ChatButton;
