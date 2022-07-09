import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";

interface Decoded {
    id: string;
}

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as Decoded;

            req.user = (await User.findById(decoded.id).select(
                "-password"
            )) as IUser;

            next();
        } catch (error: any) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
};

export { protect, admin };
