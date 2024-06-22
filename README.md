# ULTATEL React/NestJs CRUD Task

## Overview

This repository contains the frontend of the ULTATEL Frontend Task, a CRUD application for managing student records. It is built using React, TypeScript, Tailwind CSS, and SweetAlert for a modern, responsive, and user-friendly interface.

## Features

- **User Authentication**: Secure login and registration.
- **Student Management**: Full CRUD operations for students.
  - **Create**: Add new students.
  - **Read**: View student details.
  - **Update**: Edit existing student information.
  - **Delete**: Remove student records.
- **Search & Filter**: Easily search and filter students by:
  - Name
  - Gender
  - Country
  - Age
- **Pagination & Sorting**: Efficiently handle large student lists with pagination and sorting.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Interactive Alerts**: Utilize SweetAlert for user notifications and confirmations.

## Setup

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/mahmudhmh/ultatel-react-client.git
   cd ultatel-react-client
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Application**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

### Key Libraries

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **SweetAlert2**: A beautiful, responsive, customizable replacement for JavaScript's popup boxes.
- **React Router**: For navigation and routing.
- **Axios**: For making HTTP requests.

### Development Commands

- **Start Development Server**

  ```sh
  npm start
  ```

- **Build for Production**

  ```sh
  npm run build
  ```

- **Run Tests**

  ```sh
  npm test
  ```

### Deployment

For deployment, ensure the backend API base URL is correctly set in the environment variables, and build the application for production.

```sh
npm run build
```

Deploy the `build` folder to your preferred hosting service.

### Application Screens

- [Screen Shots](https://drive.google.com/drive/u/2/folders/1HM1BReF6zT0P-FsuZSxYlU08VVEbHFmZ)

### Contact

For any questions or support, please contact `mahmudhmh.business@gmail.com`.
