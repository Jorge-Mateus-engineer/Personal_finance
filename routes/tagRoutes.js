const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.route('/')
    .get(tagController.getAllTags)
    .post(tagController.createNewTag);
router.route('/:id')
    .get(tagController.getTagById)
    .patch(tagController.updateTag)
    .delete(tagController.deleteTag);

module.exports = router;