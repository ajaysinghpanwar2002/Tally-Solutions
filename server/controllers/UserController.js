import {prisma} from '../prisma/index.js'

async function getUsers(req, res) {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    }
    catch (error) {
        console.error(error);
    }
}

async function createUser(req, res) {
    try {
        const newUser = await prisma.user.create({ data: req.body });
        res.json(newUser);
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const newAge = req.body.age;
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { age: newAge },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        })
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
    }
}

export { getUsers, createUser, updateUser,deleteUser };