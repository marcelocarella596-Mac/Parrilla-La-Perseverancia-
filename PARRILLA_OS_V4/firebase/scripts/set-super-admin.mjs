import admin from 'firebase-admin';
admin.initializeApp({credential:admin.credential.applicationDefault()});
const email=process.argv[2];if(!email)throw new Error('Uso: node set-super-admin.mjs email@dominio.com');
const u=await admin.auth().getUserByEmail(email);await admin.auth().setCustomUserClaims(u.uid,{super_admin:true,rol:'SUPER_ADMIN'});await admin.database().ref(`parrillaOS/userProfiles/${u.uid}`).update({nombre:u.displayName||email,email,rol:'SUPER_ADMIN',activo:true});console.log('SUPER_ADMIN:',u.uid,email);
