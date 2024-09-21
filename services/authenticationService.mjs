import { validateUser } from '../models/User.mjs';
import { encryptPassword,comparePasswords } from "../Authentication/bcryptUtils.mjs";
import UserRepository from "../repositorios/userRepositories.mjs";
import {generateIdToken} from './tokenService.mjs'

class authenticationService{
    async RegisterUser(user){
        try{
            const validationResult= validateUser(user);
            if (!validationResult.success) {
                throw new Error(validationResult.error.message);
            }
            const hashedPassword = await encryptPassword(user.password);
            const userJson = {
                email: user.email,
                password: user.password,
                completeName: user.completeName,
                username: user.username,
                password: hashedPassword
            };
    
            const uid = await UserRepository.RegisterUserRepository(userJson);
            const result = await generateIdToken(uid)
            return result;
        }catch(error){
            console.error('Error registrando el usuario:', error);
            throw error;
        }
    };

    async LoginUser(userEmail, password){
        try{
            const result = await UserRepository.GetUserByEmail(userEmail);
            if (result.empty) {
                return { success: false, message: 'Usuario no encontrado' };
            }

            let user;
            result.forEach(doc => {
                user = doc.data();
            });

            const isMatch = await comparePasswords(password, user.password);

            if (isMatch) {
                const token = await generateIdToken(user.uid)
                console.log(token)
                return { success: true, message: 'Inicio de sesión exitoso', token};
            } else {
                return { success: false, message: 'Contraseña incorrecta' };
            }

        }catch(error){
            console.error('Error logeando el usuario:', error);
            throw error;
        }
    }
}

export default new authenticationService;