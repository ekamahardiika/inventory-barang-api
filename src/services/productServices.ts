import { prisma } from "../utils/prisma";

async function getAllProducts(){
    const products = await prisma.product.findMany();
    return products;
}

async function createProduct({}){

}