import  { useState, useEffect } from 'react';
import ChatButton from '../ChatButton/ChatButton';
import ChatWindow from '../ChatWindow/ChatWindow';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    // Load messages from local storage when the component mounts
    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    // Save messages to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSend = (message) => {
        setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);
    
        // You can add your bot response logic here
        // For example, let's add a dummy bot response for every user message
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { text: 'Bot response', isUser: false }]);
        }, 1000);
    };
    

    return (
        <div className="chat-widget">
            {!isOpen && <ChatButton onClick={handleOpen} />}
            {isOpen && (
                <ChatWindow 
                    onClose={handleClose} 
                    onSend={handleSend} 
                    messages={messages}
                />
            )}
        </div>
    );
};

export default ChatWidget;
