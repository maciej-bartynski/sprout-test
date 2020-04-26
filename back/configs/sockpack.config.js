export default {
    port: 8000,
    onMessage: async (msg, connections) => {
        const { id: from, to, body } = msg;
        const unhandled = [];
        to.forEach(async idx => {
            if (connections[idx]) {
                connections[idx].send(from, body);
            } else {
                unhandled.push(idx);
            }
        })
        if (unhandled.length) {
            connections[from].send(from, `Unhandled receivers: ${unhandled.join(", ")}`);
        }
    },
    onRegister: async (msg, connections) => {
        const { id: from, to, body } = msg;
        const unhandled = [];
        to.forEach(async idx => {
            if (connections[idx]) {
                connections[idx].send(from, body);
            } else {
                unhandled.push(idx);
            }
        });
        if (unhandled.length) {
            connections[from].send(from, `Unhandled receivers: ${unhandled.join(", ")}`);
        }
    },
}