/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: Importing the created account model to get access to the methods to perform CRUD operations
const Tag = require('../models/tagModel');

const Factory = require("./controllerFactory")


// INFO_STEP:
// 1. GET Methods
// 1.1 Get all Tags
// TODO: Implement filters by getting the query string parameters of req.query

exports.getAllTags = Factory.getAll(Tag, "Tags")

// 1.2 Get Tag by ID

exports.getTagById = Factory.getById(Tag, "Tag")

// INFO_STEP:
// 2 POST methods
// 2.1 Create Tag

exports.createNewTag = Factory.createNew(Tag)

// INFO_STEP:
// 3 PATCH Methods
// 3.1 Update Tag

exports.updateTag = Factory.updateOne(Tag, "Tag")

// INFO_STEP:
// 4 DELETE Methods
// 4.1 Delete Tag

exports.deleteTag = Factory.deleteOne(Tag, "Tag")