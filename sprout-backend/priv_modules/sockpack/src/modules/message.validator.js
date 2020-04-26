import log from 'priv_modules/logger';

const messageValidation = (incomingMsg) => {
    try {
        const msg = JSON.parse(incomingMsg);
        const { id, body } = msg;
        const hasId = typeof id === 'string';
        const isStr = typeof body === 'string';
        const isObj = typeof body === 'object' && !body.map;
        const isArr = typeof body === 'object' && body.map;
        const hasBody = !!body && (isStr || isObj || isArr);
        const isValid = hasId && hasBody;
        if (!isValid)
            throw new Error(`Invalid message: check typeof id and body.`);
        return msg;
    } catch (e) {
        log.fail(`[sockpack/validator] ${e}`);
        return null;
    }
};

export default messageValidation;
