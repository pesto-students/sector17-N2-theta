const admin = require("firebase-admin");

const serviceAccount = require("./sector17-chandigarh-firebase-adminsdk-m6tbv-19d14d27e5.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = {db};
