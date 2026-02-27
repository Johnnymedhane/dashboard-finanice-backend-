import joi from "joi";

// Validation schema for creating a transaction
export const createTransactionSchema = joi.object({
    amount: joi.number().positive().required(),
    type: joi.string().valid("income", "expense").required(),
    category: joi.string().optional(),
    date: joi.date().optional(),
    description: joi.string().allow("").optional(),
    status: joi.string().valid("completed", "pending").required()

});

// Validation schema for updating a transaction
export const updateTransactionSchema = joi.object({
    amount: joi.number().positive().optional(),
    type: joi.string().valid("income", "expense").optional(),
    category: joi.string().optional(),
    date: joi.date().optional(),
    description: joi.string().allow("").optional(),
    status: joi.string().valid("completed", "pending").optional()
});