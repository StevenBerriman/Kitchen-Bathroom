import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const EmailTemplates = () => {
  // Mock data for email templates
  const templates = [
    { id: 1, name: 'Appointment Reminder', subject: 'Your Upcoming Appointment with Kitchen & Bathroom NE', lastEdited: '2025-04-15' },
    { id: 2, name: 'Quote Follow-up', subject: 'Following Up on Your Recent Quote', lastEdited: '2025-04-10' },
    { id: 3, name: 'Installation Preparation', subject: 'Preparing for Your Upcoming Installation', lastEdited: '2025-04-05' },
    { id: 4, name: 'Customer Feedback Request', subject: 'We Value Your Feedback', lastEdited: '2025-03-28' },
    { id: 5, name: 'Welcome Email', subject: 'Welcome to Kitchen & Bathroom NE', lastEdited: '2025-03-20' },
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Email Templates</Typography>
          <Button variant="contained" color="primary">Create New Template</Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                label="Search Templates"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {templates.map((template) => (
                  <Paper 
                    key={template.id} 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      mb: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <Typography variant="h6">{template.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Subject: {template.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last edited: {new Date(template.lastEdited).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>Edit Template</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Template Name"
                    variant="outlined"
                    defaultValue="Appointment Reminder"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject Line"
                    variant="outlined"
                    defaultValue="Your Upcoming Appointment with Kitchen & Bathroom NE"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Template Type</InputLabel>
                    <Select
                      value="appointment"
                      label="Template Type"
                    >
                      <MenuItem value="appointment">Appointment</MenuItem>
                      <MenuItem value="quote">Quote</MenuItem>
                      <MenuItem value="installation">Installation</MenuItem>
                      <MenuItem value="feedback">Feedback</MenuItem>
                      <MenuItem value="general">General</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Content"
                    variant="outlined"
                    multiline
                    rows={10}
                    defaultValue={`Dear {{customer.firstName}},

We're looking forward to meeting you for your appointment on {{appointment.date}} at {{appointment.time}}.

Here's what to expect:
- Our design consultant will discuss your requirements
- We'll take measurements of your space
- We'll provide initial design ideas and options

Please have the following ready:
- Any inspiration images or ideas you'd like to share
- Information about your budget
- Questions you may have about the process

If you need to reschedule, please contact us at least 24 hours in advance.

Best regards,
The Kitchen & Bathroom NE Team
01234 567890`}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Available Variables:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Button size="small" variant="outlined">{{customer.firstName}}</Button>
                    <Button size="small" variant="outlined">{{customer.lastName}}</Button>
                    <Button size="small" variant="outlined">{{appointment.date}}</Button>
                    <Button size="small" variant="outlined">{{appointment.time}}</Button>
                    <Button size="small" variant="outlined">{{quote.number}}</Button>
                    <Button size="small" variant="outlined">{{quote.amount}}</Button>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined">Preview</Button>
                <Button variant="contained" color="primary">Save Template</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default EmailTemplates;
