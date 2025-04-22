import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const EmailAutomations = () => {
  // Mock data for email automations
  const automations = [
    { id: 1, name: 'Appointment Reminder', template: 'Appointment Reminder', trigger: 'Before Appointment', timing: '24 hours', status: 'Active' },
    { id: 2, name: 'Quote Follow-up', template: 'Quote Follow-up', trigger: 'After Quote Sent', timing: '3 days', status: 'Active' },
    { id: 3, name: 'Installation Preparation', template: 'Installation Preparation', trigger: 'Before Installation', timing: '48 hours', status: 'Active' },
    { id: 4, name: 'Post-Installation Feedback', template: 'Customer Feedback Request', trigger: 'After Installation', timing: '7 days', status: 'Inactive' },
    { id: 5, name: 'Welcome Email', template: 'Welcome Email', trigger: 'New Customer', timing: 'Immediate', status: 'Active' },
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Email Automations</Typography>
          <Button variant="contained" color="primary">Create New Automation</Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Active Automations</Typography>
          <Grid container spacing={2}>
            {automations.filter(a => a.status === 'Active').map((automation) => (
              <Grid item xs={12} md={6} lg={4} key={automation.id}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderLeft: '4px solid #4caf50',
                    height: '100%'
                  }}
                >
                  <Typography variant="h6">{automation.name}</Typography>
                  <Box sx={{ my: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Template: {automation.template}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Trigger: {automation.trigger}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Timing: {automation.timing}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                    <Button size="small" variant="outlined" color="error">Disable</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Inactive Automations</Typography>
          <Grid container spacing={2}>
            {automations.filter(a => a.status === 'Inactive').map((automation) => (
              <Grid item xs={12} md={6} lg={4} key={automation.id}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderLeft: '4px solid #9e9e9e',
                    height: '100%'
                  }}
                >
                  <Typography variant="h6">{automation.name}</Typography>
                  <Box sx={{ my: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Template: {automation.template}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Trigger: {automation.trigger}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Timing: {automation.timing}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                    <Button size="small" variant="outlined" color="success">Enable</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Create New Automation</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Automation Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Email Template</InputLabel>
                <Select
                  label="Email Template"
                >
                  <MenuItem value="appointment">Appointment Reminder</MenuItem>
                  <MenuItem value="quote">Quote Follow-up</MenuItem>
                  <MenuItem value="installation">Installation Preparation</MenuItem>
                  <MenuItem value="feedback">Customer Feedback Request</MenuItem>
                  <MenuItem value="welcome">Welcome Email</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trigger Event</InputLabel>
                <Select
                  label="Trigger Event"
                >
                  <MenuItem value="before_appointment">Before Appointment</MenuItem>
                  <MenuItem value="after_appointment">After Appointment</MenuItem>
                  <MenuItem value="quote_sent">After Quote Sent</MenuItem>
                  <MenuItem value="quote_viewed">After Quote Viewed</MenuItem>
                  <MenuItem value="before_installation">Before Installation</MenuItem>
                  <MenuItem value="after_installation">After Installation</MenuItem>
                  <MenuItem value="new_customer">New Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Timing"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      label="Unit"
                    >
                      <MenuItem value="hours">Hours</MenuItem>
                      <MenuItem value="days">Days</MenuItem>
                      <MenuItem value="weeks">Weeks</MenuItem>
                      <MenuItem value="immediate">Immediate</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" color="primary">Create Automation</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default EmailAutomations;
