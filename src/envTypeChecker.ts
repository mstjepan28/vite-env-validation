// vite-plugin.ts
import { Plugin } from 'vite';

type TEnvSchema = Record<string, string>;
type TEnv = Record<string, any>;

const ValidationOptions = {
  UNDEFINED: 'undefined',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
  MAX: 'max',
  MIN: 'min',
} as const;

type TValidationOptions =
  (typeof ValidationOptions)[keyof typeof ValidationOptions];

export const envTypeChecker = (envSchema: TEnvSchema): Plugin => {
  return {
    name: 'env-type-checker',
    configResolved({ env }) {
      const envErrors = validateEnvVariables(env, envSchema);
      console.log(JSON.stringify(envErrors, null, 2));
    },
  };
};

const validateEnvVariables = (env: TEnv, envSchema: TEnvSchema) => {
  const error = {} as Record<string, string>;

  for (const envKey in envSchema) {
    const validationVariantList = envSchema[envKey].split('|');
    const envValue = parseValue(env[envKey]);

    for (const validationVariant of validationVariantList) {
      if (
        validationVariant === ValidationOptions.UNDEFINED &&
        envValue === undefined
      ) {
        break;
      }

      const validationList = validationVariant.split(',');
      for (const validation of validationList) {
        switch (validation) {
          case ValidationOptions.STRING:
            const isValid = checkIfString(envValue);
            if (!isValid) {
              error[envKey] = `value ${envValue} is not a string`;
            }
            break;
          case ValidationOptions.NUMBER:
            break;
          case ValidationOptions.BOOLEAN:
            break;
          case ValidationOptions.NULL:
            break;
          case ValidationOptions.MAX:
            break;
          case ValidationOptions.MIN:
            break;
        }
      }
    }

    return error;
  }
};

const parseValue = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const checkIfString = (value: any) => {
  return typeof value === 'string';
};

const checkIfNumber = (value: any) => {};
