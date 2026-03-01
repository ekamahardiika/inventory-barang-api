import { prisma } from "../utils/prisma";

interface TransactionItemInput {
    productId: string;
    qty: number;
}

async function createTransaction(
    userId: string,
    bayar: number,
    items: TransactionItemInput[]
){

    return prisma.$transaction( async (tx) => {
        const purchaseItems = items.map((item) => {
            return item.productId;
        });

        const products = await tx.product.findMany({
            where: {
                id: {
                    in: purchaseItems
                }
            }
        })

        if(products.length !== items.length){
            throw new Error("PRODUCT_NOT_EXIST");
        }


        // Total
        let total = 0;

        const transactionItems = items.map((item) => {
            const product = products.find((p) => 
                p.id === item.productId
            )

            if (!product) {
                throw new Error("PRODUCT_NOT_EXIST");
            }

            if(product.stok < item.qty){
                throw new Error(`STOK_TIDAK_CUKUP`);
            }

            const subtotal = product.hargaJual * item.qty;
            total += subtotal;

            return {
                productId: product.id,
                qty: item.qty,
                harga: product.hargaJual,
                subtotal
            }
        })

        // Bayar
        if(bayar < total){
            throw new Error("UANG_TIDAK_CUKUP");
        }

        const kembalian = bayar - total

        const transaction = await tx.transaction.create({
            data: {
                userId,
                total,
                bayar,
                kembalian
            }
        })

        const transactionItem = await tx.transactionItem.createMany({
            data: transactionItems.map(item => ({
                ...item,
                transactionId: transaction.id
            }))
        })

        // 6. Update stok
        for (const item of items) {
            await tx.product.update({
                where: { id: item.productId },
                data: {
                stok: { decrement: item.qty }
                }
            });
        }

        return transaction;

    })
}

export { createTransaction }