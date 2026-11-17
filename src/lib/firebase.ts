// Conexión de solo lectura a la base de la app Creative (Realtime Database),
// para la pantalla de la trivia que se proyecta en los eventos. Es la misma
// configuración pública que usa la app; la base deja leer `eventos` sin login.
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBYBDbSqeES_PQbeOIcOI3NlIB4PooTCFY",
  authDomain: "creative-app-3deb7.firebaseapp.com",
  databaseURL: "https://creative-app-3deb7-default-rtdb.firebaseio.com",
  projectId: "creative-app-3deb7",
  storageBucket: "creative-app-3deb7.firebasestorage.app",
  messagingSenderId: "671451997554",
  appId: "1:671451997554:web:dbc1fa95495c555a0b69eb",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const database = getDatabase(app);
