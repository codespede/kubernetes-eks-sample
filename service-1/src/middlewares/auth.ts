import AuthToken from "../models/AuthToken";
import jwt from "jsonwebtoken";
import User from "../models/User";
export const isAuthorized = async (req, res, next) => {
    const authRequiredEndpoints = ['/cart', '/checkout', '/orders'];

    if(req.url === '/auth')
        return next();
    if(!req.get('Authorization'))
        res.status(403).send('Not authorized');

    try {
        const token = jwt.verify(req.get('Authorization').split('Bearer ')[1], process.env.JWT_TOKEN_KEY);
        if(token.user_id !== undefined)
            req.user = await User.findOne({where: { _id: token.user_id }});
        return next()
    } catch (e) {
        if (!authRequiredEndpoints.includes(req.url))
            return next();
        res.status(403).send('Not authorized');
    }

    // try {
    //     const user = jwt.verify(req.get('Authorization').split('Bearer ')[1], process.env.JWT_TOKEN_KEY);
    //     console.log('decoded-jwt', user)
    //     req.user = await User.findByPk(user.user_id);
    //     next()
    // } catch (e) {
    //     if (!authRequiredEndpoints.includes(req.url))
    //         return next();
    //     res.status(403).send('Not authorized');
    // }


    // const tokenString = Buffer.from(req.get('Authorization').split('Basic ')[1], 'base64').toString('utf-8').split(':')[0];
    // const token = await AuthToken.findOne({ where: { token: tokenString }, order: [['id', 'desc']] });
    // if (user)
    //     return next();
    // else
    //     res.status(403).send('Not authorized');
};
export default isAuthorized;
