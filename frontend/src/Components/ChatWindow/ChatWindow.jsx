/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatWindow.css';

const ChatWindow = ({ onClose, onSend, messages }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        onSend(message);
        setMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h4>Chat</h4>
                <button onClick={onClose}>X</button>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <ChatMessage 
                        key={index}
                        message={msg.text} 
                        isUser={msg.isUser}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type a message"
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
