import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { 
    getDailyReport,
    getMonthlyReport,
    getYearlyReport,
    getTopProducts,
    getLowStockProducts
 } from "../services/reportServices";

async function getDailyReportController(req: Request, res: Response){
    try {

        const reports = await getDailyReport()
        res.status(200).json({
            message: "Daily Report",
            data: reports
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getMonthlyReportController(req: Request, res: Response){
    try {

        const reports = await getMonthlyReport()
        res.status(200).json({
            message: "Monthly Report",
            data: reports
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getYearlyReportController(req: Request, res: Response){
    try {

        const reports = await getYearlyReport()
        res.status(200).json({
            message: "Yearly Report",
            data: reports
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getTopProductsController(req: Request, res: Response){
    try {

        const reports = await getTopProducts()
        res.status(200).json({
            message: "Top Products",
            data: reports
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getLowStockProductsController(req: Request, res: Response){
    try {

        const reports = await getLowStockProducts()
        res.status(200).json({
            message: "Low Stock Products",
            data: reports
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

export {
    getDailyReportController,
    getMonthlyReportController,
    getYearlyReportController,
    getTopProductsController,
    getLowStockProductsController
}