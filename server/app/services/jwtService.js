import JWT from 'jsonwebtoken';
import jwt from './../../config/passport/jwt';

const jwtConfig = jwt.config;

class JwtService {
    static createToken(user){
        return JWT.sign({
            user: {
                id: user.id
            }
        },
        jwtConfig.secret,
        {
            algorithm: jwtConfig.algorithm,
            expiresIn: jwtConfig.expiresIn,
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience
        });
    }
}
export default JwtService;