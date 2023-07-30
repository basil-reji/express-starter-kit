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

## Security Features

The **Express Starter Kit** incorporates the following security features to help developers build secure applications:

### JWT-Based Authentication

**Advantages of JWT-Based Authentication:**
- Stateless: JWTs are self-contained and do not require storing session information on the server. This makes the authentication process stateless, allowing for easier scalability and reducing server-side storage requirements.
- Enhanced Security: JWTs are digitally signed, ensuring that the data within the token is not tampered with. This provides a layer of security against token forgery and unauthorized access.
- Decentralized Authorization: Since JWTs carry user information within the token itself, the server doesn't need to query the database for each request. This results in faster and more efficient authorization decisions.
- Cross-Domain Authentication: JWTs can be used across different domains or subdomains, facilitating single sign-on (SSO) capabilities, which is especially useful in microservices architectures.
- Flexibility: JWTs can carry custom claims, allowing developers to include additional information about the user or access permissions.

### Rate Limiter

**Advantages of Rate Limiter:**
- Protection Against Brute Force Attacks: Rate limiting helps prevent brute force attacks by limiting the number of login attempts that can be made within a specific time frame. This enhances the security of user accounts.
- Mitigating DDoS Attacks: Rate limiting restricts the number of requests from a single IP address, helping to mitigate the impact of Distributed Denial of Service (DDoS) attacks and ensuring a stable application performance.
- Efficient Resource Utilization: By limiting the rate of requests, rate limiting ensures fair resource utilization and prevents individual users from overwhelming the server.

### Helmet

**Advantages of Helmet:**
- Mitigating Common Web Vulnerabilities: Helmet is a collection of middleware that sets HTTP headers to protect the application from various common web vulnerabilities, such as Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Clickjacking.
- Security by Default: Helmet sets secure HTTP headers automatically, reducing the chances of accidental misconfigurations or security oversights by developers.
- Cross-Domain Security: Helmet sets the `X-Frame-Options` header, which prevents clickjacking attacks by restricting how the application can be embedded in an iframe on other domains.
- XSS Protection: Helmet sets the `X-XSS-Protection` header to enable the built-in XSS protection in modern browsers, which can help prevent reflected XSS attacks.

## Usage

To start the application, follow these steps:

1. Clone the project repository:

```bash
git clone https://github.com/basil-reji/express-starter.git
cd express-starter
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the environment variables:

Create a `.env` file at the root of the project and provide the necessary configuration parameters (PORT, APP_NAME, DB_URI, and ACCESS_TOKEN_SECRET).

4. Run the application:

To start the development server, run:

```bash
npm run dev
```

To start the application in production mode, use:

```bash
npm start
```

5. Set up the admin user:

To add the admin user for the admin panel, use the following command:

```bash
npm run setup
```

This command will run a setup app on port 22626, where you can add the admin user. The admin user will be added as a super admin and can manage other admins and data in the application.

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to create an issue or submit a pull request. Contributions from the community are always welcome to make the **Express Starter Kit** even better!

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the **Express Starter Kit**! I am Basil Reji, the developer and creator of this project. If you have any questions or need further assistance, please don't hesitate to contact me through GitHub.

Happy coding!