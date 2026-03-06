import { prisma } from "../utils/prisma";
import { hashPasword } from "../utils/hash";

async function getAllUser(){
    const users = await prisma.user.findMany();
    return users;
}

async function getUserById(id: string){
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user;
}

async function createUser(name: string,
  email: string,
  password: string,
  role: "ADMIN" | "USER"){

    if(!name || !email || !password || role){
        throw new Error("INVALID_CREDENTIALS")
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(user){
        throw new Error("USER_EXIST")
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPasword(password), 
            role
        }
    })

    return newUser;
}

async function deleteUser(id: string){

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if(!user){
        throw new Error("USER_NOT_EXIST")
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return deleteUser;
}

async function updateUser(
  id: string,
  name: string,
  password: string,
  role: "ADMIN" | "USER"){

    if(!name || !password || role){
        throw new Error("INVALID_CREDENTIALS")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if(!user){
        throw new Error("USER_NOT_EXIST")
    }

    const updateUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: name,
            password: await hashPasword(password),
            role
        }
    })

    return updateUser;
}

export {
    getAllUser,
    getUserById,
    createUser, 
    deleteUser,
    updateUser
}



