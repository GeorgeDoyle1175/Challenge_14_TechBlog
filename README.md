# Challenge_14_TechBlog
Blogging Application - README
This code provides the backend server routes for a blogging application. It utilizes the Express.js framework and Sequelize ORM to handle database queries.

Dependencies
This project depends on the following packages:

express
express-handlebars
mysql2
sequelize
connect-session-sequelize
bcrypt
Routes
The following routes are implemented in the application:

Homepage
GET /: This route retrieves all the blog posts and their comments from the database and renders them in the homepage template.
Single Post Page
GET /blogpost/:id: This route retrieves a single blog post and its comments by its ID from the database and renders them in the single-post template.
Dashboard
GET /dashboard: This route retrieves all the blog posts that belong to the currently logged in user and renders them in the dashboard template. It requires the user to be authenticated, which is handled by the withAuth middleware.
Login
GET /login: This route renders the login template. If the user is already logged in, they are redirected to the homepage.
Middleware
The application uses the following middleware:

Authentication
withAuth: This middleware checks if the user is logged in by verifying the loggedIn property in the req.session object. If the user is not logged in, they are redirected to the login page.
Models
The application uses the following Sequelize models:

BlogPost: Represents a blog post in the database.
Comment: Represents a comment on a blog post in the database.
User: Represents a user in the database.
