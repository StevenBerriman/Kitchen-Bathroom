import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const router = useRouter();

  // Mock data for dashboard
  const stats = [
    { title: 'Active Quotes', value: 12, color: '#1976d2' },
    { title: 'Pending Approvals', value: 5, color: '#ff9800' },
    { title: 'Unread Messages', value: 8, color: '#f44336' },
    { title: 'Upcoming Appointments', value: 3, color: '#4caf50' }
  ];

  const recentActivity = [
    { type: 'Quote', title: 'Kitchen Renovation - Smith', date: '2 hours ago' },
    { type: 'Message', title: 'Re: Bathroom Installation', date: '5 hours ago' },
    { type: 'Remedial', title: 'Leaking Tap - Johnson', date: '1 day ago' },
    { type: 'Appointment', title: 'Initial Consultation - Williams', date: '2 days ago' }
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderTop: `4px solid ${stat.color}`
                }}
              >
                <Typography component="h2" variant="h4" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body1">{stat.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {/* Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box>
                {recentActivity.map((activity, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      p: 1.5, 
                      borderBottom: index < recentActivity.length - 1 ? '1px solid #eee' : 'none',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">{activity.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.type}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} textAlign="right">
                        <Typography variant="body2" color="text.secondary">
                          {activity.date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="text">View All Activity</Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => router.push('/quotes/new')}
                >
                  Create New Quote
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => router.push('/messages')}
                >
                  View Messages
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => router.push('/appointments')}
                >
                  Schedule Appointment
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => router.push('/customers/new')}
                >
                  Add New Customer
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
