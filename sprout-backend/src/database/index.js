import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export default (seedOptionalCallback = () => {}) => {
    mongoose
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data) => {
            console.log(`MONGODB. Database connected. ${data}`);
            seedOptionalCallback();
        });
};
