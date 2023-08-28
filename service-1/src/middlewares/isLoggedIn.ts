import jwt from "jsonwebtoken";
import User from "../models/User";

export const isLoggedIn = async (req, res, next) => {
    if(req.user !== undefined)
        return next();
    return res.status(403).send('Not authorized');
};
export default isLoggedIn;
