import restify from 'restify';
import userService from './services/userService.mjs';
import authenticationService from './services/authenticationService.mjs';

const server= restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 8080;
const applicationJson= 'application/json';


server.get('/user', async (req, res) =>{
    try {
        res.setHeader('Content-Type', applicationJson);
        const users = await userService.GetAllUsers();
        res.send(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.send(500, { message: 'Error al obtener los usuarios' });
    }

});

server.get('/user/:id', async (req, res)=>{
    try{
        res.setHeader('Content-Type', applicationJson);
        const userId = req.params.id;
        const response = await userService.GetUserById(userId);
        res.send(response)
    }catch(error){
        console.error('Error al obtener el usuario:', error);
        res.send(500, { message: 'Error al obtener el usuario' });
    }
});

server.post('/create', async (req, res)=>{
    try{
        const { completeName, username, email, password } = req.body;

        const userJson = {
            password,
            email,
            completeName,
            username,
        };
        const result= await authenticationService.RegisterUser(userJson);
        res.send({message: 'El usuario ha sido creado exitosamente', result})
    }catch(error){
        console.error('Error al crear el usuario:', error);
        res.send(500, { message: 'Error al crear el usuario' });
    }
});

server.put('/update/:id', async (req, res)=>{
    try{
        const id=req.params.id;
        const newData = req.body; 

        const response = await userService.UpdateUser(id, newData);
        res.send({message: 'The user was updated'})
    }catch(error){
        console.error('Error al actualizar el usuario:', error);
        res.send(500, { message: 'Error al actualizar el usuario' });
    }
});

server.del('/delete/:id', async (req, res)=>{
    try{
        const userId=req.params.id;
        await userService.DeleteUser(userId);
        res.send({message:'The user was deleted'})
    }catch(error){
        console.error('Error al eliminar el usuario:', error);
        res.send(500, { message: 'Error al eliminar el usuario' });
    }
});

server.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        await authenticationService.LoginUser(email, password);
        res.send({message: 'Logging was successful'});
       
    } catch (error) {
        console.error('Error al logearse:', error);
        res.send(500, { message: 'Error al logearse' });
    }
});

server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});