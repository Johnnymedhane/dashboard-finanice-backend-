export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Dashboard Finance API',
    version: '1.0.0',
    description: 'API documentation for the Dashboard Finance backend.'
  },
  servers: [{ url: '/' }],
  security: [{ bearerAuth: [] }, { cookieAuth: [] }],
  tags: [
    { name: 'Auth' },
    { name: 'Users' },
    { name: 'Dashboard' },
    { name: 'Transactions' },
    { name: 'Tasks' }
  ],
  paths: {
    '/api/users/profile': {
      get: {
        tags: ['Users'],
        summary: 'Get current user profile',
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Current user profile',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/UserProfile' }
                  },
                  required: ['user']
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Update current user profile',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserProfileUpdate' },
              example: { fullName: 'Jane Doe' }
            }
          }
        },
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Updated user profile',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/UserProfile' }
                  },
                  required: ['user']
                }
              }
            }
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthRegisterRequest' },
              examples: {
                register: {
                  value: {
                    fullName: 'Jane Doe',
                    email: 'jane@example.com',
                    password: 'P@ssw0rd!'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Registered successfully (sets httpOnly token cookie, also returns token in body)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthRegisterResponse' }
              }
            }
          },
          400: {
            description: 'Invalid payload or email already in use',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/AuthError' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login and receive a JWT',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthLoginRequest' },
              examples: {
                login: {
                  value: {
                    email: 'jane@example.com',
                    password: 'P@ssw0rd!'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful (sets httpOnly token cookie, also returns token in body)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthLoginResponse' }
              }
            }
          },
          400: {
            description: 'Invalid email or password',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/AuthError' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout (clears token cookie)',
        responses: {
          200: {
            description: 'Logout successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  },
                  required: ['message']
                },
                example: { message: 'Logout successful' }
              }
            }
          }
        }
      }
    },

    '/api/dashboard': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get dashboard data',
        parameters: [
          {
            name: 'filter',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['monthly', 'weekly', 'yearly'] },
            description: 'Dashboard aggregation filter (defaults to monthly).'
          }
        ],
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Dashboard data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { type: 'object', additionalProperties: true }
                  },
                  required: ['success', 'data']
                }
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/transactions': {
      get: {
        tags: ['Transactions'],
        summary: 'List transactions',
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Array of transactions',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } }
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      post: {
        tags: ['Transactions'],
        summary: 'Create a transaction',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TransactionCreate' },
              examples: {
                expense: {
                  value: {
                    type: 'expense',
                    amount: 50,
                    description: 'Groceries',
                    category: 'food',
                    status: 'completed',
                    date: '2026-02-10T12:00:00.000Z'
                  }
                },
                income: {
                  value: {
                    type: 'income',
                    amount: 3500,
                    description: 'Salary',
                    category: 'salary',
                    status: 'completed',
                    date: '2026-02-01T09:00:00.000Z'
                  }
                }
              }
            }
          }
        },
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          201: {
            description: 'Created transaction',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Transaction' }
              }
            }
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/api/transactions/recent': {
      get: {
        tags: ['Transactions'],
        summary: 'List recent transactions (last 7 days)',
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Array of recent transactions',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } }
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/transactions/{id}': {
      get: {
        tags: ['Transactions'],
        summary: 'Get transaction by id',
        parameters: [{ $ref: '#/components/parameters/TransactionId' }],
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Transaction',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Transaction' } }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      put: {
        tags: ['Transactions'],
        summary: 'Update a transaction',
        parameters: [{ $ref: '#/components/parameters/TransactionId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TransactionUpdate' },
              example: {
                amount: 75,
                description: 'Updated description',
                category: 'food',
                status: 'completed'
              }
            }
          }
        },
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Updated transaction',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Transaction' } }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      delete: {
        tags: ['Transactions'],
        summary: 'Delete a transaction',
        parameters: [{ $ref: '#/components/parameters/TransactionId' }],
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    id: { type: 'string' }
                  },
                  required: ['message', 'id']
                }
              }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'List tasks',
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Array of tasks',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } }
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskCreate' },
              example: { title: 'Review monthly budget', completed: false, progress: 35 }
            }
          }
        },
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          201: {
            description: 'Created task',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } }
            }
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/tasks/pending': {
      get: {
        tags: ['Tasks'],
        summary: 'Get pending task count',
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Pending tasks count',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { pendingCount: { type: 'number' } },
                  required: ['pendingCount']
                }
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },

    '/api/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by id',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Task',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update a task',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskUpdate' },
              example: { title: 'Updated title', completed: false, progress: 60 }
            }
          }
        },
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Updated task',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } }
            }
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        parameters: [{ $ref: '#/components/parameters/TaskId' }],
        responses: {
          401: { $ref: '#/components/responses/Unauthorized' },
          200: {
            description: 'Deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    id: { type: 'string' }
                  },
                  required: ['message', 'id']
                }
              }
            }
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Error' } }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    }
  },
  components: {
    parameters: {
      TaskId: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'MongoDB ObjectId of the task'
      },
      TransactionId: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'MongoDB ObjectId of the transaction'
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste your JWT token here. Format: Bearer <token>'
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: 'JWT stored in an httpOnly cookie named token'
      }
    },
    responses: {
      Unauthorized: {
        description: 'Unauthorized (missing/invalid JWT)',
        content: {
          'application/json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/AuthError' },
                { $ref: '#/components/schemas/Error' }
              ]
            },
            examples: {
              missingToken: { value: { error: 'You are not authorized! Please provide a valid token.' } },
              invalidToken: { value: { error: 'Invalid token' } }
            }
          }
        }
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: { message: 'Internal Server Error' }
          }
        }
      }
    },
    schemas: {
      UserProfile: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          fullName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        },
        required: ['_id', 'fullName', 'email']
      },
      UserProfileUpdate: {
        type: 'object',
        properties: {
          fullName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' }
        },
        additionalProperties: false
      },
      AuthRegisterRequest: {
        type: 'object',
        properties: {
          fullName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        },
        required: ['fullName', 'email', 'password'],
        additionalProperties: false
      },
      AuthLoginRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        },
        required: ['email', 'password'],
        additionalProperties: false
      },
      AuthTokenResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'JWT access token' }
        },
        required: ['token']
      },
      AuthUser: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          fullName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        },
        required: ['id', 'fullName', 'email']
      },
      AuthRegisterResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          user: { $ref: '#/components/schemas/AuthUser' },
          token: { type: 'string' }
        },
        required: ['message', 'user', 'token']
      },
      AuthLoginResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          user: { $ref: '#/components/schemas/AuthUser' },
          token: { type: 'string' }
        },
        required: ['message', 'user', 'token']
      },
      AuthError: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        },
        required: ['error'],
        additionalProperties: true
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
          fields: { type: 'array', items: { type: 'string' } }
        },
        required: ['message']
      },
      Task: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          user: { type: 'string', description: 'MongoDB ObjectId of the owning user' },
          title: { type: 'string' },
          completed: { type: 'boolean' },
          progress: { type: 'number', minimum: 0, maximum: 100 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        },
        required: ['_id', 'title', 'completed', 'progress']
      },
      TaskCreate: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 1, description: 'Non-empty title (whitespace-only is rejected).' },
          completed: { type: 'boolean' },
          progress: { type: 'number', minimum: 0, maximum: 100 }
        },
        required: ['title']
      },
      TaskUpdate: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 1, description: 'Non-empty title (whitespace-only is rejected).' },
          completed: { type: 'boolean' },
          progress: { type: 'number', minimum: 0, maximum: 100 }
        },
        additionalProperties: false
      },
      Transaction: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          user: { type: 'string', description: 'MongoDB ObjectId of the owning user' },
          type: { type: 'string', enum: ['income', 'expense'] },
          amount: { type: 'number', minimum: 0.01 },
          description: { type: 'string' },
          category: { type: 'string' },
          status: { type: 'string', enum: ['completed', 'pending'] },
          date: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        },
        required: ['_id', 'type', 'amount']
      },
      TransactionCreate: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['income', 'expense'] },
          amount: { type: 'number', minimum: 0.01 },
          description: { type: 'string' },
          category: { type: 'string' },
          status: { type: 'string', enum: ['completed', 'pending'] },
          date: { type: 'string', format: 'date-time' }
        },
        required: ['type', 'amount']
      },
      TransactionUpdate: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['income', 'expense'] },
          amount: { type: 'number', minimum: 0.01 },
          description: { type: 'string' },
          category: { type: 'string' },
          status: { type: 'string', enum: ['completed', 'pending'] },
          date: { type: 'string', format: 'date-time' }
        },
        additionalProperties: false
      }
    }
  }
};
