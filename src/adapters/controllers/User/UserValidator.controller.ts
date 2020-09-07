import { JSONSchema7 } from 'json-schema';

export const UserSaveSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        companyId: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        documentNumber: {
          type: 'string',
        },
        documentType: {
          type: 'string',
        },
      },
      required: ['email', 'password'],
    },
  },
  required: ['body'],
};

export const getSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    companyId: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    documentNumber: {
      type: 'string',
    },
    documentType: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
};
