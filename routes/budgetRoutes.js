const express = require('express');
const budgetController = require('../controllers/budgetControler');

const router = express.Router();

router.route('/')
    .get(budgetController.getAllBudgets)
    .post(budgetController.createNewBudget);
router.route('/:id')
    .get(budgetController.getBudgetById)
    .patch(budgetController.updateBudget)
    .delete(budgetController.deleteBudget);

module.exports = router;