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
PORT="3000"
APP_NAME="Express App"
NODE_ENV="development"
SESSION_NAME="name"
SESSION_SECRET="password"
DB_URI="mongodb://127.0.0.1:27017/express_app"
DB_NAME="express_app"
```

### Configuration Parameters

- **PORT**: The port number on which the application will run.
- **APP_NAME**: The name of your Express application.
- **NODE_ENV**: The environment in which the application is running (e.g., development, production, staging).
- **SESSION_NAME**: The name of the session.
- **SESSION_SECRET**: A secret key used to encrypt the session data. Choose a strong, unique passphrase.
- **DB_URI**: The MongoDB URI where your MongoDB instance is running.
- **DB_NAME**: The name of the MongoDB database.

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

## Extending the Project

The **Express Starter Kit** is designed to be easily extendable. You can build upon the existing admin panel to add more features and customize it according to your project requirements. Additionally, you can create new routes, controllers, and views to expand the application's functionality.

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to create an issue or submit a pull request. Contributions from the community are always welcome to make the **Express Starter Kit** even better!

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the **Express Starter Kit**! I am Basil Reji, the developer and creator of this project. If you have any questions or need further assistance, please don't hesitate to contact me through GitHub.

Happy coding!