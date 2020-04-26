import names from './names';
import passwords from './passwords';
import abouts from './abouts';
import emails from './emails';
import models from 'database/models';
import { name as usrName } from 'database/models/User/name';

export default async function seedUsers() {
    const UserModel = models[usrName];

    const data = names.map((_, idx) => {
        return {
            name: names[idx],
            email: emails[idx],
            password: passwords[idx],
            about: abouts[idx]
        };
    });

    await UserModel.create(data);
}
