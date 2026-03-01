import { prisma } from "../utils/prisma";

async function getAllCategories(){
    const categories = await prisma.category.findMany();
    return categories;
}

async function getCategoryById(id: string){
    const category = await prisma.category.findUnique({
        where: {
            id: id
        }
    });
    return category;
}

async function createCategory(name: string){

    if(!name){
        throw new Error("INVALID_CREDENTIALS")
    }

    const category = await prisma.category.findUnique({
        where: {
            name: name
        }
    })

    if(category){
        throw new Error("CATEGORY_EXIST")
    }

    const newCategory = await prisma.category.create({
        data: {
            name: name
        }
    })

    return newCategory;
}

async function deleteCategory(id: string){

    const category = await prisma.category.findUnique({
        where: {
            id: id
        }
    })

    if(!category){
        throw new Error("CATEGORY_NOT_EXIST")
    }

    const deleteCategory = await prisma.category.delete({
        where: {
            id: id
        }
    })

    return deleteCategory;
}

async function updateCategory(id: string, name: string){

    if(!name){
        throw new Error("INVALID_CREDENTIALS")
    }

    const category = await prisma.category.findUnique({
        where: {
            id: id
        }
    })

    if(!category){
        throw new Error("CATEGORY_NOT_EXIST")
    }

    const updateCategory = await prisma.category.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    })

    return updateCategory;
}

export {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}



