/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Budget = require('../models/budgetModel');

const Factory = require("./controllerFactory")


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all budgets
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllBudgets = Factory.getAll(Budget, "budgets")

// 1.2 Get Budget by ID

exports.getBudgetById = Factory.getById(Budget, "Budget")

// INFO_STEP:
// 2 POST methods
// 2.1 Create Budget

exports.createNewBudget = Factory.createNew(Budget)

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Budget

exports.updateBudget = Factory.updateOne(Budget, "Budget")

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Budget

exports.deleteBudget = Factory.deleteOne(Budget, "Budget")