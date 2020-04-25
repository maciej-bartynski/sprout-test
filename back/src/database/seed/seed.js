import mongoose from 'mongoose';
import seedUsers from './users';
import seedCategories from './categories';
import seedArticles from './articles';
import seedComments from './comments';
import seedTags from './tags';
import runDatabase from 'database';
import log from 'priv_modules/logger';
import 'colors';

function runSeeder() {
    log.frame(`[SEED-DATABASE] Seeding application start.`);
    async function seedDb() {
        log.ok(`[SEED-DATABASE] Seeding callback run.`);
        try {
            await mongoose.connection.db.dropDatabase();
            log.strong(`[SEED-DATABASE] Db successfully dropped.`, 'green');
            await seedUsers();
            log.ok(`[SEED-DATABASE] Users sed.`);
            await seedCategories();
            log.ok(`[SEED-DATABASE] Categories sed.`);
            await seedTags();
            log.ok(`[SEED-DATABASE] Tags sed.`);
            await seedArticles();
            log.ok(`[SEED-DATABASE] Articles sed.`);
            await seedComments();
            log.ok(`[SEED-DATABASE] Comments sed.`);
            log.frame(
                `[SEED-DATABASE] Seeder ended its task. You can abort CLI.`
            );
        } catch (e) {
            log.fail(`[SEED-DATABASE] ${e}`);
        }
        return;
    }
    runDatabase(seedDb);
}

export default runSeeder;

//runSeeder();
