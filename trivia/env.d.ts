/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_QUIZ_API_URL: string;
    // Add other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }