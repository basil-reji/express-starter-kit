# Express Starter Kit

[![GitHub](https://img.shields.io/badge/GitHub-basil--reji-blue.svg)](https://github.com/basil-reji)

The **Express Starter Kit** is a versatile starter kit built over `express-generator`, designed to kickstart any Node.js/Express.js project. This feature-rich starter kit comes pre-configured with Handlebars as the view engine and MongoDB as the database, using Mongoose as the ODM (Object Data Modeling) library. The project includes a basic UI and a well-organized template for quick starts, along with an admin panel that supports role-based access systems and can be easily extended for additional features.

## Features

- Easy setup with `express-generator` for a familiar project structure.
- Handlebars as the view engine for dynamic HTML templating.
- MongoDB as the database, configured with Mongoose for seamless data modeling.
- Role-based access systems in the admin panel for enhanced security.
- Basic UI and well-organized template for quick project starts.
- Development and production scripts for convenience.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration Parameters](#configuration-parameters)
- [Basic Usage](#basic-usage)
- [Generating the Access Token Secret](#generating-the-access-token-secret)
- [Admin Setup](#admin-setup)
  - [Running the Setup App](#running-the-setup-app)
  - [Adding the Admin](#adding-the-admin)
  - [Accessing the Admin Panel](#accessing-the-admin-panel)
- [Usage and Development](#usage-and-development)
  - [Project Structure](#project-structure)
  - [Adding Features and Functionality](#adding-features-and-functionality)
- [Security Features](#security-features)
  - [JWT-Based Authentication](#jwt-based-authentication)
  - [Rate Limiter](#rate-limiter)
  - [Helmet](#helmet)
- [Extending the Project](#extending-the-project)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:

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

3. Create the `.env` file:

Create a `.env` file at the root of your project and provide the following configuration parameters:

```dotenv
PORT=3000
APP_NAME="Express App"
NODE_ENV=development
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
DB_URI=mongodb://127.0.0.1:27017/express_app
```

### Configuration Parameters

- **PORT**: The port number on which the application will run.
- **APP_NAME**: The name of your Express application.
- **NODE_ENV**: The environment in which the application is running (e.g., development, production, staging).
- **ACCESS_TOKEN_SECRET**: A secret key used to sign JWTs for authentication. Choose a strong, unique passphrase.
- **DB_URI**: The MongoDB URI where your MongoDB instance is running.

### Basic Usage

After completing the installation steps and configuring the `.env` file, you can run the **Express Starter Kit** in development mode using:

```bash
npm run dev
```

To run the application in production mode, use:

```bash
npm start
```

The application will be accessible at the specified port (e.g., http://localhost:3000) in both development and production modes.

## Generating the Access Token Secret

To generate the `ACCESS_TOKEN_SECRET`, you can use the Node.js `crypto` module to create a random secure token. Here's a simple script to generate a strong and unique passphrase:

1. Create a file named `generateToken.js` in the root directory of your project.

2. Add the following code to the `generateToken.js` file:

```javascript
const crypto = require("crypto");

const generateAccessTokenSecret = () => {
  const tokenLength = 64; // Change the length as per your requirement
  return crypto.randomBytes(tokenLength).toString("hex");
};

console.log(generateAccessTokenSecret());
```

3. Run the script using Node.js:

```bash
node generateToken.js
```

The script will output a random string of characters, which you can copy and use as your `ACCESS_TOKEN_SECRET` in the `.env` file.

## Admin Setup

To get started with the Express Starter Kit, you can run a setup process that allows you to add an admin user to the application. This process is necessary, especially when the database is empty, to set up the admin as a super admin, who can later manage other admins and data.

### Running the Setup App

1. After cloning the project and installing the dependencies, ensure that your MongoDB server is running.

2. Open a terminal and navigate to the root directory of the project.

3. Run the following command to start the setup app:

```bash
npm run setup
```

4. The setup app will start on port 22626. You can access it through your web browser at http://localhost:22626/.

### Adding the Admin

1. In your web browser, go to http://localhost:22626/.

2. The setup app will prompt you to provide the necessary information to add the admin.

3. Fill in the required details, such as the admin's username and password.

4. Click on the "Add Admin" button to create the admin user.

5. After successfully adding the admin, the setup app will confirm the creation of the super admin.

### Accessing the Admin Panel

Once the admin has been added using the setup app, you can log in to the admin panel using the admin's credentials. The admin panel allows you to manage other admins and data, making it easy to customize the application and add more features as needed.

Please note that running the setup app should only be done once when the database is empty. If the admin is already added to the database, you can directly log in to the admin panel using the provided credentials.

## Usage and Development

After setting up the project, you can use the Express Starter Kit as a base to build your own Node.js/Express.js applications. The starter kit provides a basic UI, a well-organized template, and an admin panel with role-based access systems for added convenience.

### Project Structure

The **Express Starter Kit** follows a well-organized project structure that promotes modularity and maintainability. Here's an overview of the directories and their respective purposes:

- **bin**: Contains executable scripts for running the application and utility scripts.
  - `www`: The script responsible for starting the application server.
  - `setup`: The script for running the setup app to add the admin initially (as explained in the documentation).

- **config**: Includes configuration files and settings for various parts of the application.

- **controllers**: Contains the controllers responsible for handling the business logic of the application.

- **database**: Contains database-related files, such as database setup and models.

- **helper**: Includes utility functions and helper modules used throughout the application.

- **middleware**: Contains custom middleware functions to handle requests and perform various tasks, such as authentication and rate limiting.

- **public**: Includes static files that will be served to the client-side, such as CSS, images, and client-side JavaScript.

- **routes**: Contains the route handlers for different parts of the application. Each route file defines the endpoints and their corresponding controller functions.

- **scss**: Includes SCSS (Sass) files for styling the application. These files can be compiled into CSS.

- **views**: Contains the Handlebars templates for dynamic HTML rendering. This directory is responsible for the application's frontend.

- **services**: Contains modules for managing specific parts of the application, such as admins and other services.

By organizing the project into these directories, the **Express Starter Kit** makes it easier for developers to understand the application's structure and navigate through different components of the project. Additionally, this structure allows developers to extend and maintain the application more effectively.

### Adding Features and Functionality

You can extend the Express Starter Kit to add new features and customize the admin panel to meet your project requirements. To add a new feature:

1. Create a new route in the `routes/` directory.
2. Create a corresponding controller in the `controllers/` directory to handle the logic for the new feature.
3. Add the necessary views in the `views/` directory to display the new functionality.

By following this approach, you can build a robust and scalable application using the Express Starter Kit as a foundation.

## Security Features

The Express Starter Kit incorporates the following security features to help developers build secure applications:

### JWT-Based Authentication

**Advantages of JWT-Based Authentication:**

- Stateless: JWTs are self-contained and do not require storing session information on the server. This makes the authentication process stateless, allowing for easier scalability and reducing server-side storage requirements.
- Enhanced Security: JWTs are digitally signed, ensuring that

the data within the token is not tampered with. This provides a layer of security against token forgery and unauthorized access.

- Decentralized Authorization: Since JWTs carry user information within the token itself, the server doesn't need to query the database for each request. This results in faster and more efficient authorization decisions.
- Cross-Domain Authentication: JWTs can be used across different domains or subdomains, facilitating single sign-on (SSO) capabilities, which is especially useful in microservices architectures.
- Flexibility: JWTs can carry custom claims, allowing developers to include additional information about the user or access permissions.

### Rate Limiter

**Advantages of Rate Limiter:**

- Protection Against DDoS Attacks: Rate limiting helps prevent Distributed Denial of Service (DDoS) attacks by restricting the number of requests that can be made to the server within a specific time frame. This prevents overwhelming the server with an excessive number of requests.
- Preventing Brute Force Attacks: Rate limiting can be used to block repeated login attempts, protecting user accounts from brute force attacks.
- Efficient Resource Utilization: By limiting the number of requests per user, rate limiting ensures fair usage of server resources and prevents individual users from monopolizing server capacity.
- Enhanced Stability: Rate limiting helps to stabilize the application by preventing traffic spikes and preventing server overload during peak times.

### Helmet

**Advantages of Helmet:**

- Mitigating Common Web Vulnerabilities: Helmet is a collection of middleware that sets HTTP headers to protect the application from various common web vulnerabilities, such as Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Clickjacking.
- Security by Default: Helmet sets secure HTTP headers automatically, reducing the chances of accidental misconfigurations or security oversights by developers.
- Cross-Domain Security: The helmet sets the `X-Frame-Options` header, which prevents clickjacking attacks by restricting how the application can be embedded in an iframe on other domains.
- XSS Protection: Helmet sets the `X-XSS-Protection` header to enable the built-in XSS protection in modern browsers, which can help prevent reflected XSS attacks.

By including JWT-based authentication, rate limiting, and Helmet in the Express Starter Kit, your application will benefit from enhanced security and protection against various common web vulnerabilities.

## Extending the Project

The **Express Starter Kit** is designed to be easily extendable. You can build upon the existing admin panel to add more features and customize it according to your project requirements. Additionally, you can create new routes, controllers, and views to expand the application's functionality.

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to create an issue or submit a pull request. Contributions from the community are always welcome to make the **Express Starter Kit** even better!

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the **Express Starter Kit**! I am Basil Reji, the developer and creator of this project. If you have any questions or need further assistance, please don't hesitate to contact me through GitHub.

Happy coding!
