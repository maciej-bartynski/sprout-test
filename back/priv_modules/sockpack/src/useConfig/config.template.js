import log from 'priv_modules/logger';

export default {
    port: 8000,
    onOpen: async (connections, connection) => {
        const amount = Object.keys(connections).length;
        connection.send(
            JSON.stringify({
                from: 'not registered YET.',
                success: true,
                in_room: amount,
                body:
                    'Connection open. Registratrion will be done during first message.'
            })
        );
    },
    onRegister: async (msg, connections) => {
        const { id: from } = msg;
        try {
            connections[from].send(from, 'Connection registered.');
        } catch (e) {
            log.fail(`[sockpack/template.onRegister] ${e}`);
        }
    },
    onMessage: async (msg, connections) => {
        const { id: from, to = [], body = 'Default message.' } = msg;
        try {
            to.forEach(async (idx) => {
                if (connections[idx]) connections[idx].send(from, body);
                else
                    connections[from].send(
                        from,
                        "Given receivers doesn't exist."
                    );
            });
        } catch (e) {
            if (connections[from])
                connections[from].send(
                    from,
                    'Default message (most likely unexpected type of field: "to").'
                );
            else log.fail(`[sockpack/template.onMessage] ${e}`);
        }
    }
};
