// vite-plugin.ts
import { Plugin } from 'vite';
import { ValidationOptions } from './enums/ValidationOptions';

type TEnvSchema = Record<string, string>;
type TEnv = Record<string, any>;

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

  const checkUndefined = (envKey: any, validationVariant: string) => {
    const envValue = env[envKey];

    const isUndefined = envValue === 'undefined' || envValue === '';
    const canBeUndefined = validationVariant === ValidationOptions.UNDEFINED;

    if (isUndefined && !canBeUndefined) {
      error[envKey] = `This environment variable is required`;
    } else if (isUndefined && canBeUndefined && error[envKey]) {
      delete error[envKey];
    }

    return isUndefined && canBeUndefined;
  };

  for (const envKey in envSchema) {
    const validationVariantList = envSchema[envKey].split('|');
    const envValue = env[envKey];

    for (const validationVariant of validationVariantList) {
      const isUndefined = checkUndefined(envKey, validationVariant);
      if (isUndefined) {
        break;
      }

      const validationList = validationVariant.split(',');
      for (const validation of validationList) {
        switch (validation) {
          case ValidationOptions.STRING:
            break;
          case ValidationOptions.NUMBER:
            break;
          case ValidationOptions.BOOLEAN:
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

  return error;
};
