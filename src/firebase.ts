import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Initialize services
// Note: set_up_firebase provides firestoreDatabaseId in the config
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

// Connection test as per guidelines
async function testConnection() {
  try {
    // Try to fetch a non-existent doc from a test collection
    await getDocFromServer(doc(db, '_internal', 'connection_test'));
    console.log("Firebase connection established successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client appears to be offline.");
    }
    // Other errors are expected if the collection doesn't exist yet, so we don't log them as critical.
  }
}

testConnection();

export default app;
