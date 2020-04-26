import configTemplate from './config.template';
import log from 'priv_modules/logger';

const configValidate = (userConfig) => {
    function resolve() {
        this.value = userConfig;
        this.path.forEach((item) => {
            if (this.value[item] === undefined) {
                this.value = this.default;
                log.warn(
                    `[sockpack/validate.resolve] Sockpack config field ${
                        this.path[this.path.length - 1]
                    } is default.`
                );
            } else {
                this.value = this.value[item];
            }
        });
    }

    const mapped = {
        port: {
            default: configTemplate.port,
            value: null,
            path: ['port'],
            type: ['string', 'number'],
            get resolve() {
                return resolve.bind(this);
            },
            validate: function () {
                const valid = this.type.includes(typeof this.value);
                const msg = `Field "port" has wrong type`;
                if (!valid) throw new Error(msg);
            }
        },
        onOpen: {
            default: configTemplate.onOpen,
            value: null,
            path: ['onOpen'],
            type: ['function'],
            get resolve() {
                return resolve.bind(this);
            },
            validate: function () {
                const valid = this.type.includes(typeof this.value);
                const msg = `Field "onOpen" has wrong type`;
                if (!valid) throw new Error(msg);
            }
        },
        onMessage: {
            default: configTemplate.onMessage,
            value: null,
            path: ['onMessage'],
            type: ['function'],
            get resolve() {
                return resolve.bind(this);
            },
            validate: function () {
                const valid = this.type.includes(typeof this.value);
                const msg = `Field "onMessage" has wrong type`;
                if (!valid) throw new Error(msg);
            }
        },
        onRegister: {
            default: configTemplate.onRegister,
            value: null,
            path: ['onRegister'],
            type: ['function'],
            get resolve() {
                return resolve.bind(this);
            },
            validate: function () {
                const valid = this.type.includes(typeof this.value);
                const msg = `Field "onRegister" has wrong type`;
                if (!valid) throw new Error(msg);
            }
        }
    };

    Object.keys(mapped).map((key) => {
        const item = mapped[key];
        try {
            item.resolve();
            item.validate();
        } catch (e) {
            log.fail(`[sockpack/config.validate] ${e}`);
            process.exit(1);
        }
    });

    return mapped;
};

export default configValidate;
