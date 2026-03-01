import { NextFunction, Request, Response } from "express";

interface AuthUser {
    id: string
    role: "ADMIN" | "USER"
}

interface UserRequest extends Request {
    user: AuthUser
}

function roleMiddlewares(role: "ADMIN" | "USER"){
    return (req: UserRequest, res: Response, next: NextFunction) => {
        if(req.user.role !== role ){
            res.status(401).json({
                message: "Unauthorized"
            })
        } 
        next()
    }
}

export { roleMiddlewares }