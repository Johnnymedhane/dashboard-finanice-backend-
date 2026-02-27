import swaggerJSDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dashboard Finance API",
      version: "1.0.0",
      description: "API documentation for the Dashboard Finance backend",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    tags: [
      { name: "Dashboard" },
      { name: "Transactions" },
      { name: "Tasks" },
    ],
    components: {
      schemas: {
        Transaction: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            type: { type: "string", enum: ["income", "expense"] },
            amount: { type: "number" },
            description: { type: "string", nullable: true },
            category: { type: "string", nullable: true },
            status: { type: "string", enum: ["completed", "pending"] },
            date: { type: "string", format: "date-time" },
            deletedAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TransactionCreate: {
          type: "object",
          required: ["type", "amount", "status"],
          properties: {
            type: { type: "string", enum: ["income", "expense"] },
            amount: { type: "number", minimum: 0, exclusiveMinimum: true },
            description: { type: "string", nullable: true },
            category: { type: "string" },
            status: { type: "string", enum: ["completed", "pending"] },
            date: { type: "string", format: "date-time" },
          },
        },
        TransactionUpdate: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["income", "expense"] },
            amount: { type: "number", minimum: 0, exclusiveMinimum: true },
            description: { type: "string", nullable: true },
            category: { type: "string" },
            status: { type: "string", enum: ["completed", "pending"] },
            date: { type: "string", format: "date-time" },
          },
        },
        Task: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            title: { type: "string" },
            completed: { type: "boolean" },
            progress: { type: "number", minimum: 0, maximum: 100 },
            date: { type: "string", format: "date-time" },
            deletedAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TaskCreate: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", minLength: 3, maxLength: 100 },
            completed: { type: "boolean" },
            progress: { type: "number", minimum: 0, maximum: 100 },
            date: { type: "string", format: "date-time" },
          },
        },
        TaskUpdate: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 3, maxLength: 100 },
            completed: { type: "boolean" },
            progress: { type: "number", minimum: 0, maximum: 100 },
            date: { type: "string", format: "date-time" },
          },
        },
        PaginatedTransactions: {
          type: "object",
          properties: {
            count: { type: "integer" },
            transactions: {
              type: "array",
              items: { $ref: "#/components/schemas/Transaction" },
            },
          },
        },
        PaginatedTasks: {
          type: "object",
          properties: {
            count: { type: "integer" },
            tasks: {
              type: "array",
              items: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/api/v1/dashboard": {
        get: {
          tags: ["Dashboard"],
          summary: "Get dashboard summary",
          parameters: [
            {
              name: "filter",
              in: "query",
              required: false,
              schema: {
                type: "string",
                enum: ["weekly", "monthly", "yearly", "overall"],
              },
              description: "Time range filter",
            },
          ],
          responses: {
            200: {
              description: "Dashboard data",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        properties: {
                          income: { type: "number" },
                          expense: { type: "number" },
                          balance: { type: "number" },
                          pendingTasks: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/v1/transactions": {
        get: {
          tags: ["Transactions"],
          summary: "List transactions (paginated)",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", minimum: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", minimum: 1 } },
            { name: "type", in: "query", schema: { type: "string", enum: ["income", "expense"] } },
            {
              name: "from",
              in: "query",
              description: "Start date (YYYY-MM-DD) or ISO date-time",
              schema: { type: "string" },
              example: "2026-01-24",
            },
            {
              name: "to",
              in: "query",
              description: "End date (YYYY-MM-DD) or ISO date-time. If date-only, treated as end-of-day (inclusive).",
              schema: { type: "string" },
              example: "2026-01-26",
            },
          ],
          responses: {
            200: {
              description: "Transactions list",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PaginatedTransactions" },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Transactions"],
          summary: "Create a transaction",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TransactionCreate" },
              },
            },
          },
          responses: {
            201: {
              description: "Created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Transaction" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/v1/transactions/{id}": {
        get: {
          tags: ["Transactions"],
          summary: "Get transaction by id",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: {
              description: "Transaction",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Transaction" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
        put: {
          tags: ["Transactions"],
          summary: "Update transaction",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TransactionUpdate" },
              },
            },
          },
          responses: {
            200: {
              description: "Updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Transaction" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
        delete: {
          tags: ["Transactions"],
          summary: "Soft delete transaction",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: {
              description: "Deleted (soft)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Transaction" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
      },
      "/api/v1/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "List tasks (paginated)",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", minimum: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", minimum: 1 } },
            { name: "status", in: "query", schema: { type: "string", enum: ["completed", "pending"] } },
            {
              name: "from",
              in: "query",
              description: "Start date (YYYY-MM-DD) or ISO date-time",
              schema: { type: "string" },
              example: "2026-01-24",
            },
            {
              name: "to",
              in: "query",
              description: "End date (YYYY-MM-DD) or ISO date-time. If date-only, treated as end-of-day (inclusive).",
              schema: { type: "string" },
              example: "2026-01-26",
            },
          ],
          responses: {
            200: {
              description: "Tasks list",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PaginatedTasks" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Tasks"],
          summary: "Create a task",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TaskCreate" },
              },
            },
          },
          responses: {
            201: {
              description: "Created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/v1/tasks/{id}": {
        get: {
          tags: ["Tasks"],
          summary: "Get task by id",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: {
              description: "Task",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
        put: {
          tags: ["Tasks"],
          summary: "Update task",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TaskUpdate" },
              },
            },
          },
          responses: {
            200: {
              description: "Updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
        delete: {
          tags: ["Tasks"],
          summary: "Soft delete task",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: {
              description: "Deleted (soft)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Task" },
                },
              },
            },
            404: { description: "Not found" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
