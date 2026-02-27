
import express from 'express';
import * as  transactionController from '../controllers/transactionsController.js';
import { validateRequest } from '../middleware/validate.js';
import { createTransactionSchema, updateTransactionSchema } from '../validations/transactionsValidation.js';




const transactionRouter = express.Router();


transactionRouter.get('/', transactionController.getTransactionsController);
transactionRouter.post('/', validateRequest(createTransactionSchema), transactionController.createTransactionController);
transactionRouter.get('/:id', transactionController.getTransactionByIdController);
transactionRouter.put('/:id', validateRequest(updateTransactionSchema), transactionController.updateTransactionController);
transactionRouter.delete('/:id', transactionController.deleteTransactionController);

export default transactionRouter;