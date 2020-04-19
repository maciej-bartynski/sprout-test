import { config } from 'dotenv';
import mongoose from 'mongoose';
import populate from './populate';
// require('dotenv').config();
// const mongoose = require('mongoose');
// const populate = require('./populate');
config();

export default () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(data => {
            console.log(`MONGODB. Database connected. ${data}`);
            populate();
        })
}