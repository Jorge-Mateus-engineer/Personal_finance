/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Category = require('../models/categoryModel');

const Factory = require("./controllerFactory")


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all Categories
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllCategories = Factory.getAll(Category, "Categories")

// 1.2 Get Category by ID

exports.getCategoryById = Factory.getById(Category, "Category")

// INFO_STEP:
// 2 POST methods
// 2.1 Create Category

exports.createNewCategory = Factory.createNew(Category)

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Category

exports.updateCategory = Factory.updateOne(Category, "Category")

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Category

exports.deleteCategory = Factory.deleteOne(Category, "Category")