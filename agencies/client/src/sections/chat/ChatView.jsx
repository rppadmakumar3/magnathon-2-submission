import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, ListItemText, Divider, Typography, Paper, TextField, Button } from '@mui/material';

const Chat = () => {
    const dummyUsers = [
        { id: 1, name: 'Ravi Gupta', avatar: '/assets/images/avatars/avatar_1.jpg' },
        { id: 2, name: 'Mitali Choudhary', avatar: '/assets/images/avatars/avatar_2.jpg' },
        { id: 3, name: 'Rahul Sharma', avatar: '/assets/images/avatars/avatar_3.jpg' },
        { id: 4, name: 'Priya Patel', avatar: '/assets/images/avatars/avatar_4.jpg' },
        { id: 5, name: 'Amit Kapoor', avatar: '/assets/images/avatars/avatar_5.jpg' },
        { id: 6, name: 'Sneha Singh', avatar: '/assets/images/avatars/avatar_6.jpg' },
        { id: 7, name: 'Vikram Verma', avatar: '/assets/images/avatars/avatar_7.jpg' },
        { id: 8, name: 'Ananya Reddy', avatar: '/assets/images/avatars/avatar_8.jpg' },
        { id: 9, name: 'Arjun Saxena', avatar: '/assets/images/avatars/avatar_9.jpg' },
        { id: 10, name: 'Neha Kapoor', avatar: '/assets/images/avatars/avatar_10.jpg' },
        { id: 11, name: 'Rajat Gupta', avatar: '/assets/images/avatars/avatar_11.jpg' },
        { id: 12, name: 'Meera Joshi', avatar: '/assets/images/avatars/avatar_12.jpg' },
        { id: 13, name: 'Prateek Shah', avatar: '/assets/images/avatars/avatar_13.jpg' },
        { id: 14, name: 'Kavita Singh', avatar: '/assets/images/avatars/avatar_14.jpg' },
        { id: 15, name: 'Vishal Rajput', avatar: '/assets/images/avatars/avatar_15.jpg' },
        { id: 16, name: 'Anjali Sharma', avatar: '/assets/images/avatars/avatar_16.jpg' },
        { id: 17, name: 'Rohit Malhotra', avatar: '/assets/images/avatars/avatar_17.jpg' },
        { id: 18, name: 'Shikha Kapoor', avatar: '/assets/images/avatars/avatar_18.jpg' },
        { id: 19, name: 'Aryan Kumar', avatar: '/assets/images/avatars/avatar_19.jpg' },
        { id: 20, name: 'Tanvi Desai', avatar: '/assets/images/avatars/avatar_20.jpg' },
        // ... (add more dummy users as needed)
    ];    

  const getRecentMessages = (senderId, receiverId) => {
    // Function logic remains the same
    // ...
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [allMessages, setAllMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || {}
  );

  useEffect(() => {
    if (selectedUser) {
      try {
        const messages = getRecentMessages(1, selectedUser.id); // Assuming the logged-in user has an id of 1
        setRecentMessages(messages || []);
      } catch (error) {
        console.error('Error fetching recent messages:', error);
      }
    }
  }, [selectedUser]);

  const handleUserSelect = (user) => {
    try {
      setSelectedUser(user);
    } catch (error) {
      console.error('Error selecting user:', error);
    }
  };

  const handleSendMessage = () => {
    if (typedMessage.trim() === '') return;

    try {
      const newMessage = {
        senderId: 1, // Assuming the logged-in user has an id of 1
        receiverId: selectedUser.id,
        message: typedMessage,
        date: new Date().toISOString(),
      };

      const updatedMessages = {
        ...allMessages,
        [`${newMessage.senderId}_${newMessage.receiverId}`]: [
          ...(allMessages[`${newMessage.senderId}_${newMessage.receiverId}`] || []),
          newMessage,
        ],
      };

      setAllMessages(updatedMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

      // Update recentMessages state to display the new message
      setRecentMessages((prevMessages) => [...prevMessages, newMessage]);

      setTypedMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Paper elevation={3} style={{ width: '400px', maxHeight: '600px', overflowY: 'auto' }}>
        <List>
          {dummyUsers.map((dummyUser) => (
            <div key={dummyUser.id}>
              <ListItem button onClick={() => handleUserSelect(dummyUser)}>
                <Avatar alt={dummyUser.name} src={dummyUser.avatar} />
                <ListItemText primary={dummyUser.name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      {selectedUser && (
        <Paper elevation={3} style={{ marginLeft: '20px', flex: '1', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
          <Typography variant="h6">{selectedUser.name}</Typography>
          <List>
            {recentMessages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.message} secondary={message.date} />
              </ListItem>
            ))}
          </List>

          <div style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              label="Type a message"
              variant="outlined"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Chat;