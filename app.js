/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Express middleware to protect against HTTP Parameter Pollution attacks
const hpp = require('hpp');

// INFO_STUDY: Express middleware to protect against cross-site scripting (XSS) attacks
const xss = require('xss-clean');

// INFO_STUDY: HTTP request logger middleware for node.js
const morgan = require('morgan');

// INFO_STUDY: middleware that enhances security by setting various HTTP headers
//              to protect against common web vulnerabilities.
const helmet = require('helmet');

// INFO_STUDY: Minimal Node.js framework that provides a an extra level of abstraction
const express = require('express');

// INFO_STUDY: Basic rate-limiting middleware for Express. Use to limit repeated requests
//              to public APIs and/or endpoints such as password reset. 
const rateLimit = require('express-rate-limit');

// INFO_STUDY: Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
const mongoSanitize = require('express-mongo-sanitize');

/*================================================================================ */
/*================================ Route imports ================================= */
/*================================================================================ */

const accountRoutes = require('./routes/accountRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const movementRoutes = require('./routes/movementRoutes');
const tagRoutes = require('./routes/tagRoutes');

/*================================================================================ */
/*=========================== App Creation and set up ============================ */
/*================================================================================ */

// INFO_STEP:
// 0. Global variables
// 0.1 Array of allowed URL sources for styles to be passed to the contentSecurityPolicy for helmet
const styleSrcUrls = [
  'https://fonts.googleapis.com/',
];

//0.2 Create a rate limiter object to limit the number of requests from the same IP
const limiter = rateLimit({
  max: 100, /* The maximum number of connections to allow during the `window`
                before rate limiting the client.*/
  windowMs: 60 * 60 * 1000, //Allow 100 req from the same IP in 1 hour, to get a total in milliseconds
  message: 'Too many requests from this IP, please try again in 1 hour.',
});


// INFO_STEP:
// 1. Create an express app - the name app is a convention
const app = express();

// INFO_STEP:
// 2. Mounting middleware functions
// 2.1 Configure and mount morgan middleware to log HTTP requests based on the environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2.2 Set security HTTP headers by mounting helmet middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", ...styleSrcUrls],
        "style-src": null,
      },
    },
  }),
);

// 2.3 Mount the rate limiter middleware, since all the routes start with /api we use that as the path
app.use('/api', limiter);

// 2.4 Mount the express.json middleware to parse incoming requests with JSON payloads
app.use(express.json({ limit: '10kb' }));

// 2.5 Mount mongoSanitize middleware to sanitize user input to prevent NoSQL injection
app.use(mongoSanitize());

// 2.6 Mount xss middleware to sanitize user input to prevent cross-site scripting attacks
app.use(xss());

// 2.7 Mount hpp middleware to protect against HTTP Parameter Pollution attacks
// TODO: Check for whitelist of parameters if any
app.use(hpp());

// INFO_STEP:
// 3. Mount the routes
// TODO: Remove the comments once routes are implemented
// app.use('/api/v1/accounts', accountRoutes);
// app.use('/api/v1/budgets', budgetRoutes);
// app.use('/api/v1/categories', categoryRoutes);
// app.use('/api/v1/movements', movementRoutes);
// app.use('/api/v1/tags', tagRoutes);


// INFO_STEP:
// 4. Error handling middleware

// INFO_STUDY: Adding a handler for unhandled routes, If it reaches this point it means
//that none of the routers catched the route, so we create a new error and pass it to the next middleware

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// TODO: Add a global error handling middleware


// INFO_STEP:
// 5. Export the app
module.exports = app;