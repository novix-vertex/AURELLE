# AURELLE

### Defined by Elegance

AURELLE is a premium clothing e-commerce web application built as a full-stack project using React, Node.js, Express, and MongoDB.

The project includes JWT-based authentication, role-based access for a single seller, product management, image uploads through ImageKit, product validation, and a responsive premium clothing-store interface. 

Deployed on render as single source by combining frontend build inside the backend folder.

---

## Features

### Customer

* User registration and login
* JWT-based authentication
* Access and refresh token flow
* Persistent login using refresh tokens
* Browse active products
* View product details
* Product image gallery
* User profile
* Logout

### Seller

AURELLE uses a **single-seller model**. There is no product ownership relationship because the application has only one seller account.

Seller features include:

* Seller authentication using role-based authorization
* View all products, including inactive products
* Add products
* Edit products
* Delete products
* Activate/deactivate products

### Backend

* REST API built with Express.js
* MongoDB with Mongoose
* JWT access tokens
* JWT refresh tokens
* Refresh token rotation
* Protected routes
* Seller authorization middleware
* Express Validator
* Multer for file uploads
* ImageKit for image storage
* Centralized API error handling

---

## Tech Stack

### Frontend

* React
* React Router
* React Hook Form
* Axios
* React Hot Toast
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token
* bcrypt
* Express Validator
* Multer
* ImageKit

---

## Project Structure

AURELLE/
│
├── backend/
│   ├── public/
│   ├── src/
│   ├──── config/
│   ├──── controllers/
│   ├──── middleware/
│   ├──── models/
│   ├──── routes/
│   ├──── validators/
│   ├──── utility/
│   ├──── app.js
│   ├── .env
│   ├── .env.example
│   ├── .package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│    
├── .gitignore
└── README.md

---

# Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Git
* An ImageKit account

---

## 1. Clone the Repository

```bash
git clone https://github.com/novix-vertex/AURELLE.git
```

Move into the project:

```bash
cd AURELLE
```
---

# Backend Setup

Open the backend directory:

```bash
cd backend
```
Install dependencies:

```bash
npm install  
```


Duplicate `.env.example` file and rename it as `.env` file inside the `backend` directory and update the required values for those environment variables.

Example:
env

PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=15
ACCESS_TOKEN_EXPIRES_UNIT=m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7
REFRESH_TOKEN_EXPIRES_UNIT=d

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Start the backend:

```bash
npm run dev
```

The backend will run on:

http://localhost:3000

> Do not commit your `.env` file or API secrets to GitHub.

---

# Frontend Setup

Open a new terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install  
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# Demo Credentials

The application uses two roles.

NOTE: This is a one seller application so all the new user registered will be a customer like user not a seller.

## Seller Account

```text
Email: seller@aurelle.com
Password: adminadmin
Role: seller
```

Seller can access product management features such as:

* Add Product
* Edit Product
* Delete Product
* Activate/Deactivate Product
* View all products

## User Account

```text
Email: shiny@aurelle.com
Password: mypassword
Role: user
```

A normal user can:

* Register as a user

* Login
* View active products
* View product details

> These are demo credentials for the project.

---

# Role-Based Access

AURELLE uses a simple single-seller architecture.

```text
                    AURELLE
                       │
              ┌────────┴────────┐
              │                 │
            User              Seller
              │                 │
       Browse Products     Manage Products
              │                 │
       Active Products     All Products
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                Add          Edit        Delete
                              │
                       Activate/Deactivate
```

The seller role is stored on the user account.

Normal users cannot access seller-protected product APIs.

---

# API Reference

Base URL:

```text
https://aurelle-ar6v.onrender.com/api
```

## Authentication APIs

### Register

```http
POST /auth/register
```

Creates a new user account.

New registrations are created with the `user` role.

### Login

```http
POST /auth/login
```

Authenticates a user and returns an access token.

### Refresh Access Token

```http
POST /auth/refresh-token
```

Creates a new access token using the refresh token.

### Logout

```http
POST /auth/logout
```

Logs out the current user and invalidates the refresh token.

### Get Current User

```http
GET /auth/me
```

Returns the currently authenticated user's information.

Requires:

```http
Authorization: Bearer <access_token>
```

---

# Product APIs

## Get Active Products

```http
GET /products
```

Returns products that are currently active.

Authentication is not required.

---

## Get Product by ID

```http
GET /products/:id
```

Returns details of a specific product.

Example:

```http
GET /products/PRODUCT_ID
```

Authentication is not required.

---

## Get Seller Products

```http
GET /products/seller
```

Returns all products for the seller, including inactive products.

Requires:

```http
Authorization: Bearer <access_token>
```

Seller role required.

---

## Create Product

```http
POST /products
```

Creates a new product.

Requires:

```http
Authorization: Bearer <access_token>
```

Seller role required.

### Form fields

```text
name
description
price
category
size
stock
images
```

Multiple images can be uploaded using the `images` field. By default newly created product will be active.

---

## Update Product

```http
PUT /products/:id
```

Updates an existing product.

Requires:

```http
Authorization: Bearer <access_token>
```

Seller role required.

Example:

```http
PUT /products/PRODUCT_ID
```

---

## Delete Product

```http
DELETE /products/:id
```

Deletes a product.

Requires:

```http
Authorization: Bearer <access_token>
```

Seller role required.

---

## Activate / Deactivate Product

```http
PATCH /products/:id/status
```

Updates the product's active status.

Requires:

```http
Authorization: Bearer <access_token>
```

Seller role required.

### Request body

```json
{
  "isActive": true
}
```

or

```json
{
  "isActive": false
}
```

When a product is inactive, it is not returned through the public product listing API.

---

# Authentication Flow

AURELLE uses two JWT tokens:

### Access Token

Used to access protected APIs.

```text
Login
  ↓
Access Token
  ↓
Protected API Requests
```

### Refresh Token

Used to obtain a new access token when the access token expires.

```text
Login
  ↓
Access Token + Refresh Token
             ↓
       Access Token expires
             ↓
       Refresh Token API
             ↓
        New Access Token
```

The refresh token is stored using an HTTP-only cookie. With this it can not be called via normal js calling on the browser by others.

---

# Product Validation

Product requests are validated using `express-validator`.

The following fields are required:

* Product name
* Description
* Price
* Category
* Size
* Stock

Price must be a valid non-negative number. Price is a float value which can take both 2 and 2.5 like values.

Stock must be a valid non-negative integer.

Validation errors return a `400 Bad Request` response.

---

# Image Upload

Product images are uploaded using:

```text
React
  ↓
FormData
  ↓
Multer
  ↓
Express API
  ↓
ImageKit
  ↓
MongoDB stores image information
```

ImageKit is used for storing and serving product images.

---

# API Authentication

Protected endpoints require the access token in the request header:

```http
Authorization: Bearer <access_token>
```

Seller-only endpoints additionally verify that:

```text
user.role === "seller"
```

Unauthorized users receive a `401` response, while authenticated users without seller access receive a `403` response.

---

# Environment Variables

The following values should be configured in the backend environment:

| Variable                     | Purpose                     |
| ---------------------------- | --------------------------- |
| `PORT`                       | Backend server port         |
| `MONGO_URI`                  | MongoDB connection          |
| `ACCESS_TOKEN_SECRET`        | JWT access token secret     |
| `ACCESS_TOKEN_EXPIRES_IN`    | Access token duration       |
| `ACCESS_TOKEN_EXPIRES_UNIT`  | Access token duration unit  |
| `REFRESH_TOKEN_SECRET`       | JWT refresh token secret    |
| `REFRESH_TOKEN_EXPIRES_IN`   | Refresh token duration      |
| `REFRESH_TOKEN_EXPIRES_UNIT` | Refresh token duration unit |
| `IMAGEKIT_PUBLIC_KEY`        | ImageKit public key         |
| `IMAGEKIT_PRIVATE_KEY`       | ImageKit private key        |
| `IMAGEKIT_URL_ENDPOINT`      | ImageKit URL endpoint       |

---

# Running the Project

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Project Scope

The current version focuses on:

* Authentication
* Authorization
* Product management
* Product image uploads
* Product browsing
* Seller management

The following features are outside the current project scope:

* Payment gateway
* Cart management
* Order management
* Wishlist
* Product reviews
* Multi-seller marketplace

---

# Security Notes

* Never commit `.env` files.
* Never expose JWT secrets. Even that if expose immediately recreate and update them.
* Never expose ImageKit private keys. If exposed immediately recreate and update them.
* Demo credentials should only be used for demonstration purposes.

---

## Author

**Chirag Jain**

A full-stack e-commerce project created to demonstrate practical implementation of React, Node.js, Express, MongoDB, authentication, authorization, REST APIs, validation, and product management.
