export const ValidationOptions = {
  UNDEFINED: 'undefined',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  MAX: 'max',
  MIN: 'min',
} as const;

export type TValidationOptions = (typeof ValidationOptions)[keyof typeof ValidationOptions];
