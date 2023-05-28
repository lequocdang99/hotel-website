const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction');

//User transaction
router.get('/', transactionController.getTransaction);
//Edit transaction status
router.get('/edit', transactionController.editTransaction);
//Find hotel transaction
router.get('/:id', transactionController.getTransactionRoom);
//Make transaction
router.post('/', transactionController.postTransaction);

module.exports = router;
