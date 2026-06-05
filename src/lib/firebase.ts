// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain.firebaseapp.com",
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project-id",
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-storage-bucket.appspot.com",
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy-sender-id",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy-app-id",
// };

// // Prevent duplicate initializations in fast refresh contexts
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export default app;



import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate required environment variables
const missingVars = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error(
    `❌ Missing Firebase environment variables: ${missingVars.join(", ")}`
  );

  throw new Error(
    `Missing Firebase environment variables: ${missingVars.join(", ")}`
  );
}

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

// Optional: Debug in development only
if (import.meta.env.DEV) {
  console.log("🔥 Firebase initialized");
  console.log("Project ID:", firebaseConfig.projectId);
}