export default {
    port: 8000,
    onIncoming: async (msg, connections) => {
        msg.body += ' ADDITIONAL PART!'
        return msg;
    },
    onSend: async (msg, connections) => {
        msg.body += ' ENDING!'
        return msg;
    }
}