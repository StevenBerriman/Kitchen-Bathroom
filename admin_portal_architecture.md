# Kitchen and Bathroom NE Ltd - Admin Portal Architecture

## System Architecture Overview

The admin portal for Kitchen and Bathroom NE Ltd will be built using a modern web application architecture with the following components:

### 1. Frontend Architecture

- **Framework**: Next.js (React-based framework)
- **UI Component Library**: Tailwind CSS with custom theming to match brand identity
- **State Management**: Redux for global state management
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Form Handling**: Formik with Yup validation
- **Data Visualization**: Recharts for dashboard analytics

### 2. Backend Architecture

- **API Framework**: Node.js with Express
- **Database**: MongoDB (NoSQL database for flexibility and scalability)
- **Authentication**: Passport.js with JWT strategy
- **File Storage**: AWS S3 for document and image storage
- **Email Service**: SendGrid for transactional emails
- **PDF Generation**: PDFKit for quote and invoice generation

### 3. Deployment Architecture

- **Hosting**: Vercel for frontend, Heroku for backend
- **Database Hosting**: MongoDB Atlas
- **CI/CD**: GitHub Actions for continuous integration and deployment
- **Monitoring**: Sentry for error tracking, Google Analytics for usage analytics
- **Security**: HTTPS with SSL/TLS encryption

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  role: String (enum: "admin", "product_development", "marketing", "administration"),
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

### Customers Collection
```
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    postcode: String
  },
  notes: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (ref: Users)
}
```

### Quotes Collection
```
{
  _id: ObjectId,
  quoteNumber: String,
  customer: ObjectId (ref: Customers),
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      total: Number
    }
  ],
  subtotal: Number,
  vat: Number,
  total: Number,
  status: String (enum: "draft", "sent", "viewed", "accepted", "expired", "rejected"),
  validUntil: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (ref: Users),
  signedAt: Date,
  signatureData: String
}
```

### Projects Collection
```
{
  _id: ObjectId,
  projectNumber: String,
  customer: ObjectId (ref: Customers),
  quote: ObjectId (ref: Quotes),
  status: String (enum: "scheduled", "in_progress", "completed", "on_hold"),
  startDate: Date,
  estimatedCompletionDate: Date,
  actualCompletionDate: Date,
  tasks: [
    {
      description: String,
      assignedTo: ObjectId (ref: Users),
      status: String (enum: "pending", "in_progress", "completed"),
      dueDate: Date,
      completedAt: Date
    }
  ],
  notes: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (ref: Users)
}
```

### Messages Collection
```
{
  _id: ObjectId,
  conversation: ObjectId (ref: Conversations),
  sender: {
    type: String (enum: "user", "customer"),
    id: ObjectId (ref: Users or Customers)
  },
  content: String,
  attachments: [
    {
      filename: String,
      url: String,
      contentType: String
    }
  ],
  readBy: [ObjectId (ref: Users)],
  createdAt: Date
}
```

### Conversations Collection
```
{
  _id: ObjectId,
  customer: ObjectId (ref: Customers),
  subject: String,
  participants: [ObjectId (ref: Users)],
  lastMessage: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Invoices Collection
```
{
  _id: ObjectId,
  invoiceNumber: String,
  customer: ObjectId (ref: Customers),
  project: ObjectId (ref: Projects),
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      total: Number
    }
  ],
  subtotal: Number,
  vat: Number,
  total: Number,
  status: String (enum: "draft", "sent", "paid", "overdue", "cancelled"),
  issueDate: Date,
  dueDate: Date,
  paidDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (ref: Users)
}
```

### Products Collection
```
{
  _id: ObjectId,
  name: String,
  category: String (enum: "kitchen", "bathroom", "appliance", "fixture"),
  description: String,
  sku: String,
  price: Number,
  cost: Number,
  supplier: ObjectId (ref: Suppliers),
  images: [String],
  specifications: Object,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Suppliers Collection
```
{
  _id: ObjectId,
  name: String,
  contactPerson: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    postcode: String
  },
  notes: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Documents Collection
```
{
  _id: ObjectId,
  name: String,
  category: String,
  relatedTo: {
    type: String (enum: "customer", "project", "quote", "invoice", "general"),
    id: ObjectId
  },
  url: String,
  contentType: String,
  size: Number,
  uploadedBy: ObjectId (ref: Users),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/password` - Change password

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user (admin only)

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Quotes
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get quote by ID
- `POST /api/quotes` - Create new quote
- `PUT /api/quotes/:id` - Update quote
- `DELETE /api/quotes/:id` - Delete quote
- `POST /api/quotes/:id/send` - Send quote to customer
- `POST /api/quotes/:id/sign` - Process signed quote

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/tasks` - Add task to project
- `PUT /api/projects/:id/tasks/:taskId` - Update project task

### Messages
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get conversation by ID
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id/messages` - Get messages in conversation
- `POST /api/conversations/:id/messages` - Send message in conversation
- `PUT /api/messages/:id/read` - Mark message as read

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `POST /api/invoices/:id/send` - Send invoice to customer
- `PUT /api/invoices/:id/status` - Update invoice status

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents` - Upload new document
- `DELETE /api/documents/:id` - Delete document

## Frontend Structure

### Pages
- `/login` - Login page
- `/dashboard` - Main dashboard (role-specific)
- `/customers` - Customer management
- `/customers/:id` - Customer details
- `/quotes` - Quote management
- `/quotes/new` - Create new quote
- `/quotes/:id` - Quote details
- `/projects` - Project management
- `/projects/:id` - Project details
- `/messages` - Message center
- `/messages/:id` - Conversation thread
- `/invoices` - Invoice management
- `/invoices/:id` - Invoice details
- `/products` - Product catalog
- `/suppliers` - Supplier management
- `/documents` - Document management
- `/settings` - User settings and system configuration

### Components
- `Layout` - Main application layout with navigation
- `Dashboard` - Role-specific dashboard components
- `CustomerForm` - Form for creating/editing customers
- `QuoteBuilder` - Interactive quote creation tool
- `ProjectTimeline` - Visual project timeline
- `MessageThread` - Threaded conversation view
- `FileUploader` - Document upload component
- `DataTable` - Reusable table component with sorting and filtering
- `Calendar` - Scheduling calendar
- `Notifications` - Notification center
- `Reports` - Report generation components

## Security Considerations

1. **Authentication and Authorization**
   - JWT-based authentication with short expiration times
   - Role-based access control for all resources
   - Password hashing using bcrypt
   - CSRF protection

2. **Data Protection**
   - Input validation on all API endpoints
   - Sanitization of user inputs to prevent XSS attacks
   - Rate limiting to prevent brute force attacks
   - Data encryption for sensitive information

3. **Infrastructure Security**
   - HTTPS with TLS 1.2+
   - Regular security updates for all dependencies
   - Database access restricted to application servers
   - Firewall configuration to limit access

4. **Compliance**
   - GDPR compliance for customer data
   - Audit logging for sensitive operations
   - Data retention policies
   - Privacy policy and terms of service

## Scalability Considerations

1. **Database Scaling**
   - Indexing for frequently queried fields
   - Database sharding for future growth
   - Caching layer for frequently accessed data

2. **Application Scaling**
   - Stateless API design for horizontal scaling
   - Load balancing for distributed traffic
   - Microservices architecture for independent scaling

3. **Storage Scaling**
   - Cloud storage for documents and images
   - CDN for static assets
   - Compression for storage efficiency

## Monitoring and Maintenance

1. **Performance Monitoring**
   - API response time tracking
   - Database query performance
   - Frontend load time metrics

2. **Error Tracking**
   - Centralized error logging
   - Real-time error notifications
   - User feedback collection

3. **Backup and Recovery**
   - Daily database backups
   - Point-in-time recovery options
   - Disaster recovery plan

4. **Updates and Maintenance**
   - Scheduled maintenance windows
   - Versioned API for backward compatibility
   - Feature flagging for gradual rollouts
