const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const customersRoutes = require('./routes/customers');
const quotesRoutes = require('./routes/quotes');
const projectsRoutes = require('./routes/projects');
const conversationsRoutes = require('./routes/conversations');
const documentsRoutes = require('./routes/documents');
const emailTemplatesRoutes = require('./routes/email-templates');
const emailAutomationsRoutes = require('./routes/email-automations');
const emailRoutes = require('./routes/email');

// Import email scheduler
const emailScheduler = require('./utils/emailScheduler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/email-templates', emailTemplatesRoutes);
app.use('/api/email-automations', emailAutomationsRoutes);
app.use('/api/email', emailRoutes);

// Schedule email tasks
cron.schedule('0 * * * *', () => {
  console.log('Running email scheduler...');
  emailScheduler.processScheduledEmails();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
