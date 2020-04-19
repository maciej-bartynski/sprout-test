import messages from './messages';

const disabledLog = {};
for (const key in messages) {
    disabledLog[key] = () => { };
}

export default process.env.DISABLE_LOGS ? disabledLog : messages;
