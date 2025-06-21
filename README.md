# Blog API Documentation

Welcome to the comprehensive documentation for the Blog API! This is a production-ready RESTful API designed for managing blog posts, users, comments, and engagement features.

## 🚀 Getting Started

**Live API**: `https://blog-api-dc2g.onrender.com/api/v1`

New to the API? Start here:

1. **[Quick Start Guide](api-reference/quick-start.md)** - Get up and running in minutes
2. **[Authentication](api-reference/authentication.md)** - Understand the security model
3. **[API Reference](api-reference/README.md)** - Complete endpoint documentation

## 📋 API Overview

- **Version**: 1.0.0
- **Authentication**: JWT Bearer tokens with refresh token support
- **Authorization**: Role-based access control (admin/user)
- **Rate Limiting**: 60 requests per minute per IP address
- **Content Format**: JSON with multipart/form-data for file uploads
- **Security**: HTTPS, HTTP-only cookies, CORS enabled

## 🔧 Core Features

### 🔐 **Authentication & Users**

- User registration and login
- JWT access tokens with automatic refresh
- Role-based permissions (admin/user)
- User profile management
- Social media links support

### 📝 **Blog Management**

- Rich HTML content support
- Image banner uploads (Cloudinary integration)
- Draft and published status
- SEO-friendly URL slugs
- View tracking and analytics

### 💬 **Engagement Features**

- Comment system with moderation
- Like/unlike functionality
- Real-time engagement metrics
- User interaction tracking

### 🛡️ **Security & Performance**

- Rate limiting protection
- Input validation and sanitization
- Error handling with detailed responses
- Optimized for production deployment

## 📚 Documentation Structure

### API Reference

- **[Overview](api-reference/README.md)** - API introduction and navigation
- **[Quick Start](api-reference/quick-start.md)** - Get started in 5 minutes
- **[Authentication](api-reference/authentication.md)** - JWT tokens and auth flows
- **[Users](api-reference/users.md)** - User management endpoints
- **[Blogs](api-reference/blogs.md)** - Blog post CRUD operations
- **[Comments](api-reference/comments.md)** - Comment system features
- **[Likes](api-reference/likes.md)** - Engagement and likes management
- **[Data Models](api-reference/data-models.md)** - Complete schema definitions
- **[Error Responses](api-reference/error-responses.md)** - Error handling guide

### Guides

- **[Rate Limiting](guides/rate-limiting.md)** - API usage limits and headers
- **[Error Handling](guides/error-handling.md)** - Common errors and solutions

## 🎯 Use Cases

### For Developers

- **Frontend Applications**: Build web or mobile blog readers
- **Content Management**: Create admin dashboards for blog management
- **Integrations**: Connect with existing systems and workflows
- **Learning Projects**: Practice API integration and authentication

### For Content Creators

- **Blog Platforms**: Power your own blogging platform
- **Portfolio Sites**: Showcase articles and writing
- **Community Platforms**: Enable user-generated content
- **Educational Content**: Manage courses and tutorials

## 🛠️ Technology Stack

### Backend Architecture

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **File Storage**: Cloudinary for image management
- **Validation**: express-validator for input validation
- **Security**: Helmet.js, CORS, rate limiting

### Infrastructure

- **Hosting**: Render.com deployment
- **CDN**: Cloudinary for image delivery
- **Monitoring**: Built-in logging and error tracking
- **Documentation**: GitBook integration

## 🚦 API Status

Check the API health status:

```bash
curl https://blog-api-dc2g.onrender.com/api/v1/
```

Response:

```json
{
  "message": "API is live",
  "status": "ok",
  "version": "1.0.0",
  "docs": "https://ashutosh-3.gitbook.io/blog-api/"
}
```

## 🔗 Quick Links

- **[Live API](https://blog-api-dc2g.onrender.com/api/v1)** - Production endpoint
- **[GitBook Documentation](https://ashutosh-3.gitbook.io/blog-api/)** - Interactive docs
- **[GitHub Repository](https://github.com/darksword7/blog-api)** - Source code
- **[OpenAPI Specification](openapi.yaml)** - Machine-readable API spec

## 📞 Support

Need help or found an issue?

- 📖 **Documentation**: Check the relevant sections in this documentation
- 🐛 **Bug Reports**: Create an issue on GitHub
- 💡 **Feature Requests**: Suggest improvements via GitHub issues
- 📧 **Contact**: Reach out to the development team

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

**Ready to start building?** Head over to the **[Quick Start Guide](api-reference/quick-start.md)** and create your first API integration in minutes!
