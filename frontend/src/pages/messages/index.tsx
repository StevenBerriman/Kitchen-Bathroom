import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const Messages = () => {
  // Mock data for conversations
  const conversations = [
    { id: 1, customer: 'John Smith', lastMessage: 'When will the installation team arrive?', time: '10:30 AM', unread: true },
    { id: 2, customer: 'Sarah Johnson', lastMessage: 'Thank you for the quote, I have a few questions.', time: 'Yesterday', unread: false },
    { id: 3, customer: 'Michael Williams', lastMessage: 'The kitchen looks fantastic! Thank you.', time: 'Apr 20', unread: false },
    { id: 4, customer: 'Emma Brown', lastMessage: 'I need to reschedule my appointment.', time: 'Apr 19', unread: true },
    { id: 5, customer: 'David Wilson', lastMessage: 'Is it possible to change the countertop material?', time: 'Apr 18', unread: false },
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                <TextField
                  fullWidth
                  placeholder="Search conversations"
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                {conversations.map((conversation) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem 
                      alignItems="flex-start" 
                      button
                      sx={{ 
                        bgcolor: conversation.unread ? '#f0f7ff' : 'transparent',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>{conversation.customer.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" component="span">
                              {conversation.customer}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span">
                              {conversation.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color={conversation.unread ? 'text.primary' : 'text.secondary'}
                            sx={{
                              display: 'inline',
                              fontWeight: conversation.unread ? 'bold' : 'normal',
                            }}
                          >
                            {conversation.lastMessage}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }}>J</Avatar>
                <Typography variant="h6">John Smith</Typography>
              </Box>
              
              <Box sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ my: 2 }}>
                  Today
                </Typography>
                
                {/* Customer message */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Avatar sx={{ mr: 1, width: 32, height: 32 }}>J</Avatar>
                  <Paper sx={{ p: 1.5, maxWidth: '80%', bgcolor: '#f5f5f5', borderRadius: '0 8px 8px 8px' }}>
                    <Typography variant="body1">
                      Hello, I was wondering when the installation team will arrive tomorrow?
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      10:15 AM
                    </Typography>
                  </Paper>
                </Box>
                
                {/* Admin message */}
                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'flex-end' }}>
                  <Paper sx={{ p: 1.5, maxWidth: '80%', bgcolor: '#e3f2fd', borderRadius: '8px 0 8px 8px' }}>
                    <Typography variant="body1">
                      Hi John, the team is scheduled to arrive between 9:00 AM and 10:00 AM. They'll call you 30 minutes before arrival.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      10:20 AM
                    </Typography>
                  </Paper>
                  <Avatar sx={{ ml: 1, width: 32, height: 32, bgcolor: '#1976d2' }}>A</Avatar>
                </Box>
                
                {/* Customer message */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Avatar sx={{ mr: 1, width: 32, height: 32 }}>J</Avatar>
                  <Paper sx={{ p: 1.5, maxWidth: '80%', bgcolor: '#f5f5f5', borderRadius: '0 8px 8px 8px' }}>
                    <Typography variant="body1">
                      Perfect, thank you! Should I prepare anything before they arrive?
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      10:30 AM
                    </Typography>
                  </Paper>
                </Box>
              </Box>
              
              <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex' }}>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button variant="contained">Send</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Messages;
