export interface WebAppConfig {
  apiBaseUrl: string;
  googleClientId: string;
  mode: string;
}

export const webAppConfig: WebAppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? 'google-client-id-placeholder',
  mode: import.meta.env.MODE,
};
