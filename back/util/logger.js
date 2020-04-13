const messages = require('./messages');

const disabledLog = {};
for (const key in messages) {
    disabledLog[key] = () => { };
}

module.exports = process.env.DISABLE_LOGS ? disabledLog : messages;
