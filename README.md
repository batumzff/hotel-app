# Hotel Reservation System

A **Full-Stack Hotel Reservation System** built with modern web technologies, enabling users to book hotel rooms, manage reservations, make payments, and view personal information. This project includes a **React** frontend and a **Node.js**/ **Express** backend, with **MongoDB** as the database and **Stripe** for handling payments.

## Features

### Frontend:
- **React.js**: Used to build a dynamic and responsive user interface.
- **Redux Toolkit**: For managing state throughout the application.
- **Material UI**: Used for beautiful and responsive UI components.
- **React Router DOM**: For client-side routing.
- **React Hook Form & Yup**: For form validation and management.
- **Stripe Integration**: For secure payments.

### Backend:
- **Node.js** & **Express.js**: Backend logic and API handling.
- **MongoDB**: NoSQL database for data storage.
- **JWT**: For authentication and secure user sessions.
- **Stripe API**: For processing payments.
- **Multer**: For file uploads (e.g., profile pictures).
- **Express-Async-Errors**: For better error handling in asynchronous routes.

---

## Tech Stack

### Frontend:
- **React.js** (v18.3.1)
- **Redux Toolkit** (v2.2.7)
- **Material UI** (v6.1.1)
- **React Hook Form** (v7.53.0)
- **Stripe** for React (v2.8.0)
- **Vite** (for fast development and build)

### Backend:
- **Node.js** (v16.x.x)
- **Express.js** (v4.19.2)
- **MongoDB** (v8.2.3)
- **Stripe API** (v16.11.0)
- **JWT** for authentication (v9.0.2)
- **Multer** for file uploads (v1.4.5)

---

## Folder Structure

### Frontend

```plaintext
hotel-frontend/
├── src/
│   ├── assets/                        # Static assets like images
│   │   └── images/                    # Image assets (e.g., avatars, backgrounds)
│   ├── components/                    # Reusable components for the app
│   │   ├── AUTH-FORM/                 # Authentication form components
│   │   ├── ERROR-MODAL/               # Error handling modal components
│   │   ├── FORM-INPUTS/               # Form input components (Input, Select, Calendar)
│   │   ├── IMAGE-SLIDER/              # Image slider component for rooms
│   │   ├── MESSAGES-USERS/            # Message components for users
│   │   ├── PAGINATION/                # Pagination component
│   │   ├── PAYMENT-FORM/              # Stripe payment form component
│   │   ├── PERSONAL-INFO/             # Personal information form component
│   │   ├── ROOM-CARD/                 # Room card component for room listing
│   │   └── SUSPENSE-WRAPPER/          # Suspense wrapper for lazy loading
│   ├── custom-hooks/                  # Custom React hooks
│   ├── features/                      # Redux slices for state management (e.g., auth, booking)
│   ├── helpers/                       # Utility functions and validation helpers
│   ├── pages/                         # Page components (e.g., Home, Login, Rooms)
│   ├── router/                        # Routing logic for React Router
│   └── store/                         # Redux store setup
```

### Backend
```plaintext
hotel-api/
├── configs/                            # Configuration files (e.g., DB connection)
├── controllers/                        # Controllers for handling requests
│   ├── auth.js                         # Authentication logic
│   ├── room.js                         # Room-related operations
│   ├── payment.js                      # Payment processing logic
│   ├── reservation.js                  # Reservation handling logic
├── helpers/                            # Helper functions (e.g., validation, utility functions)
├── middlewares/                        # Middlewares for requests
│   ├── authentication.js               # JWT authentication middleware
│   ├── errorHandler.js                 # Global error handler
├── models/                             # Mongoose models for data
│   ├── message.js                      # Message model for user communication
│   ├── payment.js                      # Payment model for transactions
│   ├── reservation.js                  # Reservation model for hotel bookings
│   ├── room.js                         # Room model for room details
├── routes/                             # Express routes
│   ├── auth.js                         # Authentication routes (register, login)
│   ├── room.js                         # Routes for room operations
│   ├── reservation.js                  # Routes for managing reservations
│   ├── payment.js                      # Routes for handling payments
├── index.js                            # Entry point for the backend API
```

## Installation

### Prerequisites:
- **Node.js** (v16.x.x or higher)
- **MongoDB** (Local or cloud instance)
- **Stripe API keys**

### Backend Setup:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hotel-api.git
   cd hotel-api
   ```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add the following:
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
4. Start the server:
```bash
node index.js
```



### Frontend Setup:
1. Navigate to the frontend directory:
```bash
   cd hotel-frontend
```
2. Install dependencies:
```bash
   pnpm install
```
3. Start the development server:
```bash
pnpm run dev
```

### Usage
1. Register or Log in to the system.
2. Browse available hotel rooms, make reservations, and manage your personal details.
3. Complete secure payments using Stripe.
4. Administrators can manage rooms, view reservations, and handle user messages.

### API Endpoints
Authentication
POST /auth/register - Register a new user.
POST /auth/login - Log in an existing user.
Rooms
GET /rooms - Retrieve all available rooms.
POST /rooms - Create a new room (Admin only).
PATCH /rooms/:id - Update room details (Admin only).
DELETE /rooms/:id - Delete a room (Admin only).
Reservations
POST /reservations - Make a new reservation.
GET /reservations - Get all user reservations.
DELETE /reservations/:id - Cancel a reservation.
Payments
POST /payments - Process Stripe payment.

