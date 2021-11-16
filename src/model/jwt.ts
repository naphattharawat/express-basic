var jwt = require('jsonwebtoken');

export class JwtModel {

    sign(payload: any) {
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        return token;
    }

    verify(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}