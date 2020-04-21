import findAllRecords from 'routes/utils/findAllRecords';
import { name } from 'database/models/Category/name';
export default (_, res) => {
    findAllRecords(name, res);
};
