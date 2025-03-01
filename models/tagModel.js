/*================================================================================ */
/*=============================== Package imports ================================ */
/*================================================================================ */

// INFO_STUDY: MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

/*================================================================================ */
/*============================== Tag Schema Definition =========================== */
/*================================================================================ */

// INFO_STUDY: refer to .schemaAndModelsInfo.md for more information

// INFO_STEP:
// 1. Define a schema for the tag collection
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A tag must have a name']
    }
});

// INFO_STEP:
// 2. Create a model for the tag schema
const Tag = mongoose.model('Tag', tagSchema);

// INFO_STEP:
// 3. Export the Tag model
module.exports = Tag;