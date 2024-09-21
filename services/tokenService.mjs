import {auth} from '../repositorios/conexionBase.mjs'

// import firebase from 'firebase/app';
// import 'firebase/auth';

// async function generateIdToken() {
//   try {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       const idToken = await user.getIdToken(true); 
//       sendTokenToBackend(idToken);
//     } else {
//       console.error("No hay usuario autenticado.");
//     }
//   } catch (error) {
//     console.error("Error al recuperar el token de ID:", error);
//   }
// }


async function generateIdToken(uid, claims = {}) {
    try {
       const token = await auth.createCustomToken(uid, claims);
       return token;
     } catch (error) {
       console.error("Error generando el token personalizado:", error);
        throw new Error("Error generando el token personalizado.");
    }
}


async function verifyIdToken(idToken) {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error("Error verificando el token:", error);
      throw new Error("Token inválido.");
    }
}

export { /*generateCustomToken,*/generateIdToken, verifyIdToken };
