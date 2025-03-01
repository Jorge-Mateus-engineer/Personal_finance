/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Movement = require('../models/movementModel');

const Factory = require("./controllerFactory")


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all Movements
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllMovements = Factory.getAll(Movement, "Movements")

// 1.2 Get Movement by ID

exports.getMovementById = Factory.getById(Movement, "Movement")

// INFO_STEP:
// 2 POST methods
// 2.1 Create Movement

exports.createNewMovement = Factory.createNew(Movement)

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Movement

exports.updateMovement = Factory.updateOne(Movement, "Movement")

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Movement

exports.deleteMovement = Factory.deleteOne(Movement, "Movement")