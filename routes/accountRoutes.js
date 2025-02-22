const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.route('/').get(accountController.getAllAccounts);
router.route('/:id')
    .get(accountController.getAccountById)
    .post(accountController.createNewAccount)
    .patch(accountController.updateAccount)
    .delete(accountController.deleteAccount);

module.exports = router;