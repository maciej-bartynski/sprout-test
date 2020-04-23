import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const usePackages = Object.freeze({
    bodyParser: bodyParser.json(),
    cookieParser: cookieParser(),
    compression: compression()
});

export default usePackages;
