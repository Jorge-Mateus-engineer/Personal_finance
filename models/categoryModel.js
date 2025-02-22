/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

/*================================================================================ */
/*=========================== Category Schema Definition ========================= */
/*================================================================================ */

// INFO_STUDY: refer to .schemaAndModelsInfo.md for more information

// INFO_STEP:
// 1. Define a schema for the category collection
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "All Categories must have a name"]
    }
});

// INFO_STEP:
// 2. Create a model for the category schema
const Category = mongoose.model('Category', categorySchema);

// INFO_STEP:
// 3. Export the Category model
module.exports = Category;
