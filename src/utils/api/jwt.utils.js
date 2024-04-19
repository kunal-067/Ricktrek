import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET || 'RK345Etj%&lsldjf(02/.?jdj';
const jwt_expiry = process.env.JWT_EXPIRY || '30d';

export const generateToken = (data) => {
    try {
        const token = jwt.sign(data, jwt_secret, {
            expiresIn: jwt_expiry
        });
        return token;
    } catch (err) {
        console.error('error in generating jwt token at jwt utils', err.message);
        throw new Error('error in generating token at jwt utils', err)
    }
}

export const verifyToken = (token) => {
    try {
        const data = JSON.parse(atob(token.value.split('.')[1]));

        return data;
    } catch (err) {
        console.error('error in verifying token at jwt utils', err.message);
        throw new Error('error in verifying token at jwt utils', err)
    }
}