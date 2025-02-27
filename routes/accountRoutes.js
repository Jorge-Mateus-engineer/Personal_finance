const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.route('/')
    .get(accountController.getAllAccounts)
    .post(accountController.createNewAccount);
router.route('/:id')
    .get(accountController.getAccountById)
    .patch(accountController.updateAccount)
    .delete(accountController.deleteAccount);

module.exports = router;