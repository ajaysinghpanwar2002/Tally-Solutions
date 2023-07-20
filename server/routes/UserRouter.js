import express from 'express';
const UserRouter = express.Router();

import {getUsers,createUser,updateUser,deleteUser} from '../controllers/UserController.js'

UserRouter.get('/',getUsers);
UserRouter.post('/createuser',createUser);
UserRouter.put('/:id',updateUser);
UserRouter.delete('/:id',deleteUser);

export default UserRouter; 