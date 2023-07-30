# Express Starter Kit

[![GitHub](https://img.shields.io/badge/GitHub-basil--reji-blue.svg)](https://github.com/basil-reji)

The **Express Starter Kit** is a versatile starter kit built on top of `express-generator`, designed to kickstart any Node.js/Express.js project. This feature-rich starter kit comes pre-configured with Handlebars as the view engine and MongoDB as the database, using Mongoose as the ODM (Object Data Modeling) library. The project includes a basic UI and a well-organized template for quick starts, along with an admin panel that supports role-based access systems and can be easily extended for additional features.

## Features

- Easy setup with `express-generator` for a familiar project structure.
- Handlebars as the view engine for dynamic HTML templating.
- MongoDB as the database, configured with Mongoose for seamless data modeling.
- Role-based access systems in the admin panel for enhanced security.
- Basic UI and well-organized template for quick project starts.
- Development and production scripts for convenience.
- Rate limiter, Helmet, Nonce method for enhanced security.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Setting Up Admin](#setting-up-admin)
- [Extending the Project](#extending-the-project)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

### Prerequisites

Before you can use the Express Starter Kit, make sure you have the following software installed:

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/basil-reji/express-starter.git
cd express-starter
```

2. Install the dependencies:

```bash
npm install
```

### Configuration

Before you can run the application, you need to configure the environment variables. Create a `.env` file at the root of your project and provide the following configuration parameters:

```dotenv
# Application Configuration
PORT=3000
APP_NAME=Express App

# MongoDB Configuration
DB_URI=mongodb://127.0.0.1:27017/express_app

# Security Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret
```

- **PORT**: The port number on which the application will run.
- **APP_NAME**: The name of your Express application.
- **DB_URI**: The MongoDB URI where your MongoDB instance is running.
- **ACCESS_TOKEN_SECRET**: Secret key for signing JSON Web Tokens (JWT) for authentication.

### Running the Application

To start the development server, use the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

To start the application in production mode, use the following command:

```bash
npm start
```

### Setting Up Admin

To add the admin and use the admin panel features, you need to run the setup command. The setup script will add an admin user with super admin privileges to the database. You can then use the admin panel to manage other admins and data.

```bash
npm run setup
```

After running the setup command, you can access the admin panel at `http://localhost:22626/admin` and log in using the admin credentials you provided during the setup process.

## Extending the Project

The Express Starter Kit is designed to be easily extendable. You can build upon the existing admin panel to add more features and customize it according to your project requirements. Additionally, you can create new routes, controllers, and views to expand the application's functionality.

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to create an issue or submit a pull request. Contributions from the community are always welcome to make the Express Starter Kit even better!

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Thank you for using the Express Starter Kit! If you have any questions or need further assistance, please don't hesitate to contact me through GitHub.

Happy coding!