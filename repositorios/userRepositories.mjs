import {auth, db} from './conexionBase.mjs'
import { DB_NAMES } from "../models/dbCollections.mjs";

const usersRef = db.collection(DB_NAMES.USERS);

class UserRepository {
  async RegisterUserRepository(user) {
    try {
      const newUser = await auth.createUser({
        email: user.email,
        password: user.password,
      });

      const uid = newUser.uid;

      const userJson = {
        uid,
        email: user.email,
        completeName: user.completeName,
        username: user.username,
        password: user.password,
      };

      await usersRef.doc(uid).set(userJson);
      return uid;
    } catch (error) {
      console.error("Error creando usuario:", error);
      if (error.code === "auth/email-already-exists") {
        throw new Error("Email address is already in use");
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async GetAllUsersRepository() {
    try {
      const response = await usersRef.get();
      let responseArr = [];
      response.forEach((doc) => {
        responseArr.push(doc.data());
      });
      return responseArr;
    } catch (error) {
      console.error("Error al obtener los usuarios");
      throw new Error("Error obtenindo los usuarios");
    }
  }

  async GetUserById(userId) {
    try {
      const response = await usersRef.doc(userId).get();
      return response;
    } catch (error) {
      console.error("Error al obtener el usuario");
      throw new Error("Error obtenindo el usuario");
    }
  }

  async GetUserByEmail(userEmail) {
    try {
      const response = await usersRef.where("email", "==", userEmail).get();
      return response;
    } catch (error) {
      console.error("Error al obtener el email del usuario");
      throw new Error("Error obtenindo el email del usuario");
    }
  }

  async UpdateUser(id, newData) {
    try {
      const response = await usersRef.doc(id).update(newData);
      return response;
    } catch (error) {
      console.error("Error al actualizar el usuario");
      throw new Error("Error al actualizar el usuario");
    }
  }

  async DeleteUser(userId) {
    try {
      const response = await usersRef.doc(userId).delete();
      return response;
    } catch (error) {
      console.error("Error al intentar eliminar el usuario");
      throw new Error("Error al intentar eliminar el usuario");
    }
  }
}

export default new UserRepository();
