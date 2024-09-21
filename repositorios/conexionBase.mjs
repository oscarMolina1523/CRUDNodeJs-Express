import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";
import 'firebase/auth';

dotenv.config();
const keyPath = "./key.json";
const credentials = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const db = admin.firestore();
const auth = admin.auth();

export { auth, db };
