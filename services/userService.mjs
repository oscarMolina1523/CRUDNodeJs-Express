import UserRepository from "../repositorios/userRepositories.mjs";

class userService{
    async GetAllUsers(){
        try{

            const result = await UserRepository.GetAllUsersRepository();
            return result;

        }catch(error){

            console.error('Error creando usuario:', error);
            throw error;
        }
    }

    async GetUserById(userId){
        try{

            const result= await UserRepository.GetUserById(userId);
            return result;

        }catch(error){
            console.error('Error obteniendo el usuario:', error);
            throw error;
        }
    }

    async UpdateUser(id, newData){
        try{

            const result= await UserRepository.UpdateUser(id, newData);
            return result;

        }catch(error){
            console.error('Error actualizando el usuario:', error);
            throw error;
        }
    }

    async DeleteUser(userId){
        try{
            const result=await UserRepository.DeleteUser(userId);
            return result;
        }catch(error){
            console.error('Error al intentar eliminar el usuario:', error);
            throw error;
        }
    }
}


export default new userService;