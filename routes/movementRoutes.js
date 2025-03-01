const express = require('express');
const movementController = require('../controllers/movementController');

const router = express.Router();

router.route('/')
    .get(movementController.getAllMovements)
    .post(movementController.createNewMovement);
router.route('/:id')
    .get(movementController.getMovementById)
    .patch(movementController.updateMovement)
    .delete(movementController.deleteMovement);

module.exports = router;