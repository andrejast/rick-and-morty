# Rick and Morty App

This is a React-based Rick and Morty application that integrates Firebase for authentication and real-time data. It includes various packages such as React Query, GSAP, Tailwind CSS, and more for optimal performance and user experience.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

---

## About the Project

This application allows users to explore characters from the Rick and Morty series, with search and infinite scrolling capabilities. Firebase is used for user authentication, enabling users to sign up, log in, and view personalized content.

## Features

- **User Authentication**: Firebase Authentication (Sign up, Login, Logout)
- **Character Search and Infinite Scrolling**: Browse through characters with React Query and infinite scrolling for a smooth experience
- **Animations**: GSAP and Lottie animations for enhanced UI interactions
- **Toast Notifications**: React Toastify for user feedback on actions

---

## Getting Started

To get started, clone the repository and install dependencies.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- Firebase account to configure Firebase services

---

## Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration. Here’s an example of the variables you’ll need:

````plaintext
## Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration. Here’s an example of the variables you’ll need:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id



````

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/andrejast/rick-and-morty.git
   cd rick-and-morty-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   Ensure your `.env` file contains the correct Firebase configuration keys as mentioned above.

4. **Build the application**

   ```bash
   npm run build
   ```

5. **Start the application**

   ```bash
   npm start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

Once the application is running:

1. **Sign Up / Log In**: Users can create an account or log in using Firebase Authentication.
2. **Browse Characters**: Use the search bar to find specific characters or scroll down to load more characters.
3. **Browse Episodes**
4. **Browse Placec**
5. **Logout**: Users can log out securely, and their session will be managed by Firebase.

---

## Technologies Used

This project is built with the following technologies and libraries:

- **React**: Core library for building UI components.
- **Firebase**: Backend services for authentication and real-time database.
  - **Firebase Authentication**: Manages user sign-up, login, and session persistence.
  - **Firestore Database**: Stores user-specific data in real time.
- **React Query**: Efficiently manages server-state and caching for API data.
- **Axios**: Simplified HTTP requests for data fetching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **GSAP** & **Lottie**: Animations for a dynamic and engaging UI.
- **React Router**: Manages client-side routing for a single-page application experience.
- **React Toastify**: Provides notifications for user actions.

---

#### Thank you for checking out the Rick and Morty App! Enjoy exploring the universe of Rick and Morty characters, and feel free to contribute to make this app even better!
