const {onCall,HttpsError}=require('firebase-functions/v2/https');
const admin=require('firebase-admin');
admin.initializeApp();
const db=admin.database();
function assertSuper(req){if(!req.auth||req.auth.token.super_admin!==true)throw new HttpsError('permission-denied','Requiere SUPER_ADMIN');}
exports.adminCreateUser=onCall(async req=>{assertSuper(req);const {email,password,nombre,rol,localId}=req.data||{};if(!email||!password||password.length<8||!nombre||!rol||!localId)throw new HttpsError('invalid-argument','Datos incompletos o contraseña menor a 8 caracteres');const u=await admin.auth().createUser({email,password,displayName:nombre});const claims={rol,local_id:localId};if(rol==='SUPER_ADMIN')claims.super_admin=true;await admin.auth().setCustomUserClaims(u.uid,claims);await db.ref(`parrillaOS/userProfiles/${u.uid}`).set({nombre,email,rol,localId,activo:true,fechaAlta:Date.now()});return{uid:u.uid};});
exports.adminSetUserStatus=onCall(async req=>{assertSuper(req);const {uid,activo}=req.data||{};if(!uid)throw new HttpsError('invalid-argument','uid requerido');await admin.auth().updateUser(uid,{disabled:activo===false});await db.ref(`parrillaOS/userProfiles/${uid}/activo`).set(activo!==false);return{ok:true};});
