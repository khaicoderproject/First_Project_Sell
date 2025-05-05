# E-commerce Project

A full-featured e-commerce web application built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication and authorization
- Product management system
- Shopping cart functionality
- Order processing
- Admin dashboard
- Image upload with Cloudinary integration
- Rich text editor (TinyMCE)
- Responsive design
- Flash notifications
- Form validation
- Error handling middleware

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