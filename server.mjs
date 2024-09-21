import express from 'express';
import userService from './services/userService.mjs';
import authenticationService from './services/authenticationService.mjs';
import {verifyIdToken } from './services/tokenService.mjs'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;


app.get("/getAll", async ( req, res)=>{
    try{
        const idToken = req.headers.authorization?.split('Bearer ')[1];
        console.log(token)
        if (!idToken) {
            return res.status(401).send('Unauthorized');
        }
        const validationResult = await verifyIdToken(token);
        if (!validationResult.success) {
            return res.status(401).send(validationResult.message); // Envía un error si el token no es válido
        }
        const response= await userService.GetAllUsers();
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).send("Error fetching users");
    }
});

app.get("/get/:id",async (req, res)=>{
    try{
        const userId = req.params.id;
        const response = await userService.GetUserById(userId);
        res.status(200).send(response.data());
    }catch(error){
        res.status(500).send("Error fetching user");
    }

})

app.post("/create", async (req, res) => {
    try {
        const { completeName, username, email, password } = req.body;

        const userJson = {
            password,
            email,
            completeName,
            username,
        };
        const result= await authenticationService.RegisterUser(userJson);
        console.log(result);

        res.status(201).json({ message: 'User created successfully', result });
    } catch (error) {
        console.error('Error creating user:', error);

        if (error instanceof Error && error.message.startsWith('Error creating user: ')) {
            const errorMessage = JSON.parse(error.message.substring('Error creating user: '.length));
            return res.status(400).json({ error: errorMessage }); 
        }

        if (error.message === 'Email address is already in use') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).send("Error creating user");
    }
});


app.put("/update/:id", async (req, res)=>{
    try{
        const id=req.params.id;
        const newData = req.body; 

        const response = await userService.UpdateUser(id, newData);
        res.status(200).send(response);
    }catch(error){
        res.status(500).send("Error updating user");
    }
})

app.delete("/delete/:id",async (req, res)=>{
    try{
        const userId=req.params.id;
        await userService.DeleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }catch(error){
        res.status(500).send("Error deleting user");
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await authenticationService.LoginUser(email, password);
        res.status(200).json({ token });
       
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
