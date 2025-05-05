# Digital Marketplace Platform

A versatile digital platform that combines multiple business features including product sales, news publishing, and user management. Built with Node.js, Express, and MongoDB, this system provides a flexible solution for businesses to manage their online presence, content, and sales in one integrated platform.

## 🌟 Platform Overview

- **Digital Storefront**: Product showcase and sales management
- **Content Hub**: News and blog publishing system
- **User Portal**: Personalized user experience and account management
- **Admin Center**: Comprehensive control panel for all platform features

## 🌟 Key Aspects

- **E-commerce Core**: Full-featured online store functionality
- **Content Management**: Integrated news and blog system
- **User Management**: Comprehensive user and role management
- **Admin Dashboard**: Powerful admin interface for both store and content management

## 🚀 Features

### Client Features
- **User Management**
  - User registration and authentication
  - User profile management
  - Password reset functionality
  - User dashboard

- **Shopping Experience**
  - Product browsing and searching
  - Category-based navigation
  - Product details with rich text descriptions
  - Shopping cart management
  - Order placement and tracking
  - Order history

- **Content & News**
  - News/Blog section
  - Post reading and interaction
  - Latest updates and announcements

### Admin Features
- **Product Management**
  - Product CRUD operations
  - Category management
  - Product image upload with Cloudinary
  - Inventory tracking
  - Product status management

- **Order Management**
  - Order processing
  - Order status updates
  - Order history tracking
  - Customer order management

- **User Management**
  - User list and management
  - Role-based access control
  - Permission management
  - User activity monitoring

- **Content Management**
  - News/Blog management
  - Post creation and editing
  - Content publishing workflow
  - Rich text editor integration

### System Features
- **Security**
  - Role-based authentication
  - Session management
  - Password hashing
  - Input validation
  - XSS protection
  - CSRF protection

- **Performance**
  - Image optimization
  - Caching mechanisms
  - Efficient database queries
  - Static file serving

- **User Experience**
  - Responsive design
  - Flash notifications
  - Form validation feedback
  - Error handling
  - Loading states
  - Toast notifications

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Template Engine:** EJS
- **Authentication:** Cookie-based session
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary
- **Form Validation:** Express Validator & Joi
- **Rich Text Editor:** TinyMCE
- **Development:** Nodemon

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
├── config/         # Configuration files
├── controllers/    # Route controllers
├── helpers/        # Helper functions
├── middleware/     # Custom middleware
├── models/         # Database models
├── public/         # Static files
├── routes/         # Route definitions
├── uploads/        # Uploaded files
├── utils/          # Utility functions
├── validate/       # Validation schemas
├── views/          # EJS templates
├── server.js       # Application entry point
└── package.json    # Project dependencies
```

## 🔒 Security Features

- Cookie-based session management
- Password hashing with MD5
- Input validation and sanitization
- Error handling middleware
- Secure file upload handling

## 🎯 API Endpoints

The application includes both client and admin routes:

- Client routes for user-facing features
- Admin routes for backend management
- RESTful API endpoints for data operations

## 🚀 Deployment

The project is configured for deployment on Vercel with the included `vercel.json` configuration file.

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Error Handling

The application includes comprehensive error handling:
- Custom error middleware
- 404 page for undefined routes
- Flash messages for user feedback
- Validation error handling

## 🔄 Development

For development, the project uses nodemon for automatic server restarting:
```bash
npm run dev
``` 
