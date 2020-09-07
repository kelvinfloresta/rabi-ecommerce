import { JSONSchema7 } from 'json-schema';

// eslint-disable-next-line import/prefer-default-export
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
