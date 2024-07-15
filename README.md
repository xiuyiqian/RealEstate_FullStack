# Real Estate Full Stack Application

## Architecture Overview

This document describes the architecture and database design logic of the Real Estate Full Stack Application.

![Architecture Diagram](./Real%20Estate.png)

### High-Level Architecture

The application consists of several components:
- **Frontend**: Built with React, it includes public and private layouts.
- **Backend**: Implemented using Express.js, it interacts with MongoDB through Prisma ORM.
- **Database**: MongoDB is used as the primary database.
- **Authentication and Authorization**: Middleware is used for user verification, especially for sensitive operations like deleting posts.

### Component Breakdown

#### Frontend

- **React App**: The client-side application is built using React. It manages routes and provides a seamless user experience.
  - **Public Layout**:
    - Homepage
    - List Page
    - Single Post Page
    - Login Page
    - Register Page
  - **Private Layout**:
    - Profile Page
    - Update User Page
    - Add Post Page

#### Backend

- **Express API**: The server-side application built with Express.js handles all API requests.
  - **Routes**: Define endpoints for user authentication, post management, chat operations, etc.
  - **Middleware**: Includes user verification middleware to ensure secure operations.

- **Prisma ORM**: Prisma is used to interact with the MongoDB database, providing a type-safe API for database operations.

#### Database

- **MongoDB**: The primary database for storing user information, posts, chat messages, and other application data.

### Database Design

The database design includes several collections:
- **User**: Stores user information.
- **Post**: Stores posts created by users.
- **PostDetail**: Stores additional details for each post.
- **SavedPost**: Stores posts saved by users.
- **Chat**: Represents chat collections.
- **Message**: Stores messages within chats.
