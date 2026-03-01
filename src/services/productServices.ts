import { prisma } from "../utils/prisma";

type ProductInput = {
  name: string;
  hargaJual: number;
  hargaBeli: number;
  stok: number;
  categoryId: string;
};

async function getAllProducts(){
    const products = await prisma.product.findMany();
    return products;
}

async function getProductById(id: string){

    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });

    return product;
}

async function createProduct(data: ProductInput){
    const {name, hargaBeli, hargaJual, stok, categoryId} = data;

    if(!name || hargaBeli === undefined || hargaJual ===  undefined || stok === undefined || !categoryId){
        throw new Error("NO_CREDENTIALS")
    }

    if(hargaBeli <= 0 || hargaJual <= 0 || stok < 0){
        throw new Error("INVALID_CREDENTIALS")
    }

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })

    if(!category){
        throw new Error("CATEGORY_NOT_EXIST");
    }

    const product = await prisma.product.create({
        data: {
            name: name,
            hargaBeli: hargaBeli,
            hargaJual: hargaJual,
            stok: stok,
            categoryId: categoryId
        }
    })

    return product;
}

async function deleteProduct(id: string){
    const findProduct = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    if(!findProduct){
        throw new Error("PRODUCT_NOT_EXIST")
    }

    const deleteProduct = await prisma.product.delete({
        where: {
            id: id
        }
    })

    return deleteProduct;
}

async function updateProduct(id: string, data: ProductInput){
    const {name, hargaBeli, hargaJual, stok, categoryId} = data;

    if(!name || !hargaBeli || !hargaJual || !stok || !categoryId){
        throw new Error("NO_CREDENTIALS")
    }

    if(hargaBeli <= 0 || hargaJual <= 0 || stok <= 0){
        throw new Error("INVALID_CREDENTIALS")
    }

    const findProduct = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    if(!findProduct){
        throw new Error("PRODUCT_NOT_EXIST")
    }

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })

    if(!category){
        throw new Error("CATEGORY_NOT_EXIST");
    }

    const updateProduct = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: name,
            hargaBeli: hargaBeli,
            hargaJual: hargaJual,
            stok: stok,
            categoryId: categoryId
        }
    })

    return updateProduct;
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}


