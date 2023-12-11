import { defineConfig } from 'vite';
import { envTypeChecker } from './src/envTypeChecker';

const envSchema = {
  VITE_APP_TITLE: 'string,max:255,min:10|undefined', // My Vite App
  VITE_API_URL: 'string', // https://api.example.com
  VITE_API_KEY: 'string', // your-api-key
  VITE_DEBUG_MODE: 'boolean|undefined', // true
  VITE_LOG_LEVEL: 'string[info,warn,error]', // debug
  VITE_VERSION: 'number', // 1.0.0
} as const;

export default defineConfig({
  plugins: [envTypeChecker(envSchema)],
});
