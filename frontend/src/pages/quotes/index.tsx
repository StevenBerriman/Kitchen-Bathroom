import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, TextField, Tabs, Tab } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

const Quotes = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data for quotes
  const quotes = [
    { id: 'Q1001', customer: 'John Smith', project: 'Kitchen Renovation', amount: '£8,500', status: 'Pending', date: '2025-04-15' },
    { id: 'Q1002', customer: 'Sarah Johnson', project: 'Bathroom Installation', amount: '£6,200', status: 'Accepted', date: '2025-04-10' },
    { id: 'Q1003', customer: 'Michael Williams', project: 'Kitchen Upgrade', amount: '£4,800', status: 'Pending', date: '2025-04-08' },
    { id: 'Q1004', customer: 'Emma Brown', project: 'Full Bathroom Remodel', amount: '£9,300', status: 'Expired', date: '2025-03-25' },
    { id: 'Q1005', customer: 'David Wilson', project: 'Kitchen Countertops', amount: '£2,100', status: 'Accepted', date: '2025-04-05' },
  ];

  // Filter quotes based on tab
  const filteredQuotes = quotes.filter(quote => {
    if (tabValue === 0) return true; // All quotes
    if (tabValue === 1) return quote.status === 'Pending';
    if (tabValue === 2) return quote.status === 'Accepted';
    if (tabValue === 3) return quote.status === 'Expired';
    return false;
  });

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Quotes</Typography>
          <Button variant="contained" color="primary">Create New Quote</Button>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="quote tabs">
            <Tab label="All Quotes" />
            <Tab label="Pending" />
            <Tab label="Accepted" />
            <Tab label="Expired" />
          </Tabs>
        </Paper>

        <Paper>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Search Quotes"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            
            {filteredQuotes.map((quote, index) => (
              <Paper 
                key={quote.id} 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  mb: 2,
                  borderLeft: quote.status === 'Pending' ? '4px solid #ff9800' : 
                            quote.status === 'Accepted' ? '4px solid #4caf50' : 
                            '4px solid #f44336'
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">{quote.project}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quote.customer} • Quote #{quote.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body1">{quote.amount}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(quote.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>View</Button>
                    <Button 
                      variant="contained" 
                      size="small"
                      color={quote.status === 'Pending' ? 'primary' : 'secondary'}
                    >
                      {quote.status === 'Pending' ? 'Send Reminder' : 'Details'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default Quotes;
