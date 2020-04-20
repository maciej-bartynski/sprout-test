import expressJwt from 'express-jwt';
import constans from 'routes/auth/util';
import { config } from 'dotenv';
config();

const protect = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: constans.decodedProperty
})

export default protect;