
import express from 'express';
import * as  transactionController from '../controllers/transactionsController.js';


const transactionRouter = express.Router();

// Mock transaction data
transactionRouter.get('/', transactionController.getTransactionsController);
transactionRouter.post('/', transactionController.createTransactionController);

export default transactionRouter;