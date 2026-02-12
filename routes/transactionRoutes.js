
import express from 'express';
import * as  transactionController from '../controllers/transactionsController.js';


const transactionRouter = express.Router();

// Mock transaction data
transactionRouter.get('/', transactionController.getTransactionsController);
transactionRouter.get('/recent', transactionController.getRecentTransactionsController);
transactionRouter.get('/:id', transactionController.getTransactionByIdController);
transactionRouter.post('/', transactionController.createTransactionController);
transactionRouter.put('/:id', transactionController.updateTransactionController);
transactionRouter.delete('/:id', transactionController.deleteTransactionController);

export default transactionRouter;