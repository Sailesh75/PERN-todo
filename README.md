# Todo Application

## Overview
A simple and intuitive full-stack Todo application built with React, Node.js, and PostgreSQL. This app allows users to create, update, and delete tasks seamlessly.

## Features
- User authentication and authorization
- Google OAuth integration for easy login
- Password reset via email using Nodemailer
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design
- Real-time updates with instant feedback
- Deployed on Railway, Render, and Netlify

## Technologies Used
- **Frontend**: React, React Hooks, Axios, Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Hosting**: Railway, Render, Netlify
- **CI/CD**: GitHub Actions
- **Other**: 
  - React-Toastify for notifications
  - Google OAuth for authentication
  - Nodemailer for email functionality

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/todo-application.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd todo-application/backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    ```bash
    cp .env.example .env
    ```
   - Configure your database settings, Google OAuth credentials, and email settings in the `.env` file.
5. Run the application:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd todo-application/frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    ```bash
    cp .env.example .env
    ```
   - Configure your API endpoint in the `.env` file.
4. Run the application:
    ```bash
    npm start
    ```

## Deployment

### Backend Deployment
1. **Railway:**
   - Follow Railway's documentation to deploy your backend.
2. **Render:**
   - Follow Render's documentation to deploy your backend.

### Frontend Deployment
1. **Netlify:**
   - Follow Netlify's documentation to deploy your frontend.

## Project Links
- [Live Demo](https://todo-application-99.netlify.app/login)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
