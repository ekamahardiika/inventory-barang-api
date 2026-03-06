import { prisma } from "../utils/prisma";

async function getDailyReport(){
    const today = new Date();

    const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const transactions = await prisma.transaction.findMany({
    where: {
        createdAt: {
            gte: startOfDay,
            lt: endOfDay
        }
    }, 
    include: {
        items: true
    }
  })

  const totalRevenue = transactions.reduce((acc, trx) => {
    return acc + trx.total;
  }, 0);

  const totalItems = transactions.reduce((acc, trx) => {
    const items = trx.items.reduce((sum, item) => {
      return sum + item.qty;
    }, 0);

    return acc + items;
  }, 0);

  return {
    totalTransactions: transactions.length,
    totalRevenue,
    totalItems
  };
  
}

async function getMonthlyReport(){
    const month = new Date();

    const startOfMonth = new Date(
    month.getFullYear(),
    month.getMonth()
  );

  const endOfMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1
  );

  const transactions = await prisma.transaction.findMany({
    where: {
        createdAt: {
            gte: startOfMonth,
            lt: endOfMonth
        }
    }, 
    include: {
        items: true
    }
  })

  const totalRevenue = transactions.reduce((acc, trx) => {
    return acc + trx.total;
  }, 0);

  const totalItems = transactions.reduce((acc, trx) => {
    const items = trx.items.reduce((sum, item) => {
      return sum + item.qty;
    }, 0);

    return acc + items;
  }, 0);

  return {
    totalTransactions: transactions.length,
    totalRevenue,
    totalItems
  };
  
}

async function getYearlyReport(){
    const year = new Date();

    const startOfYear = new Date(
    year.getFullYear()
  );

  const endOfYear = new Date(
    year.getFullYear() + 1
  );

  const transactions = await prisma.transaction.findMany({
    where: {
        createdAt: {
            gte: startOfYear,
            lt: endOfYear
        }
    }, 
    include: {
        items: true
    }
  })

  const totalRevenue = transactions.reduce((acc, trx) => {
    return acc + trx.total;
  }, 0);

  const totalItems = transactions.reduce((acc, trx) => {
    const items = trx.items.reduce((sum, item) => {
      return sum + item.qty;
    }, 0);

    return acc + items;
  }, 0);

  return {
    totalTransactions: transactions.length,
    totalRevenue,
    totalItems
  };
  
}

async function getTopProducts() {

  const result = await prisma.transactionItem.groupBy({
    by: ["productId"],
    _sum: {
      qty: true
    },
    orderBy: {
      _sum: {
        qty: "desc"
      }
    },
    take: 5
  });

  const productIds = result.map(r => r.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  return result.map(r => {
    const product = products.find(
      p => p.id === r.productId
    );

    return {
      productId: r.productId,
      productName: product?.name,
      totalSold: r._sum.qty
    };
  });
}

async function getLowStockProducts() {

  const products = await prisma.product.findMany({
    where: {
      stok: {
        lte: 5
      }
    },
    orderBy: {
      stok: "asc"
    }
  });

  return products;
}

export {
    getDailyReport,
    getMonthlyReport,
    getYearlyReport,
    getTopProducts,
    getLowStockProducts
}
