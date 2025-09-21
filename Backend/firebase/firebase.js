const admin = require('firebase-admin');
const serviceAccount = require('../firebase/sports-platform-f70a5-firebase-adminsdk-fbsvc-d9a60b74fc.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
