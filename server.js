/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

// INFO_STUDY: module that loads environment variables from a .env file into process.env.
const dotenv = require('dotenv');

// INFO_STUDY: Our express app
const app = require('./app');

/*================================================================================ */
/*============================ Server Configuration ============================== */
/*================================================================================ */

// INFO_STUDY:
/*
process is global node object that provides information about, and control over, the current Node.js process.
As a global, it is always available to Node.js applications without using require().

process is an instance of EventEmitter, which is where the emitter.on(eventName, listener)
method comes from. This method allows us to attach a listener function to the event named eventName.

The method process.exit([code]) instructs Node.js to terminate the process synchronously with an exit status code.
If code is specified, then it is used as the exit status and otherwise the exit status is 0.

Relevant links
https://nodejs.org/api/events.html#emitteroneventname-listener
https://nodejs.org/api/process.html#processexitcode
*/

//INFO_STEP:
// 1. Handling uncaught exceptions, caused by erros in our code
process.on('uncaughtException', (err) => {
  console.log(err);
  console.error('Closing Server due to an Uncaught Exception...');
  process.exit(1);
});

//INFO_STEP:
// 2. Load environment variables by calling the config method on
//      the dotenv object and passing the path to the .env file
dotenv.config({ path: './config.env' });

//INFO_STEP:
// 3. Connecting to the database
// 3.1 Create a connection string by replacing the PASSWORD placeholder in the DATABASE string
//      with the actual password from the environment variables
const databaseConnectionString = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD,
);

// 3.2 Connect to the database using the connection string in an async function
//      and log a message to the console if the connection is successful
async function dbConnect() {
  await mongoose.connect(databaseConnectionString);
  console.log('Connected to database! 👽');
  //   .then((con) => console.log(con));
}
dbConnect();

//INFO_STEP:
// 4. Start the server
// 4.1 Create a variable to store the port number from the environment variables
const port = process.env.PORT || 3000;

// 4.2 Start the server by calling the listen method on the app object
//      and pass the port number and a callback function that logs a message to the console
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

//INFO_STEP:
// 5. Handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err);
  console.error('Closing Server due to an Unhandled Rejection...');
  server.close();
});