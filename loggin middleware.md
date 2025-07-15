# URL Shortener Web App

This is a simple React-based URL Shortener web application that allows users to shorten URLs and view statistics for each link. It includes user authentication and displays basic click tracking data. The UI is built using Material UI components.

---

## Features

- **Authentication (Login/Logout)**
  - Only authenticated users can access the shortener and statistics.
  - Login is validated against hardcoded credentials.

- **URL Shortener**
  - Users can input a long URL to generate a shortened link.
  - Shortened links follow the pattern `http://localhost:3000/<code>`.
  - Unique code is generated using random string logic.

- **Click Statistics**
  - Displays timestamp and source of each simulated click.
  - Dummy data is used to simulate click tracking.

- **Client-Side Validations**
  - URL field cannot be empty.
  - Login fields are required.

- **Routing and Redirection**
  - Routes are handled using `react-router-dom`.
  - Invalid routes redirect back to login or home as appropriate.

- **Styling**
  - All UI components are styled using Material UI.

---

## Folder Structure

