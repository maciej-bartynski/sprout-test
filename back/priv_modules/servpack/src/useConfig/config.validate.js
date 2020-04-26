import configTemplate from './config.template';
import log from 'priv_modules/logger';

const mapCustomerValues = (config) => {
    const resolveValue = function () {
        try {
            let givenConfig = { ...config };
            this.path.forEach((key) => {
                givenConfig = givenConfig[key];
            });
            const treatAsUndefined = [undefined, '', null];
            const givenIsUndefined = treatAsUndefined.includes(givenConfig);

            if (givenIsUndefined)
                log.warn(
                    `[servpack.mapping] Given value "${givenConfig}" for config field "${
                        this.path[this.path.length - 1]
                    }" falls to default: "${this.default}".`
                );
            this.customer = givenIsUndefined ? this.default : givenConfig;
        } catch (e) {
            log.warn(
                `[servpack.mapping] Given value for "${
                    this.path[this.path.length - 1]
                }" is set to default: "${this.default}".`
            );
            log.warn(`[servpack.mapping] ${e}.`);
        }
        this.customer =
            this.customer === 'disabled' ? undefined : this.customer;
    };

    return {
        port: {
            default: configTemplate.port,
            path: ['port'],
            type: 'number',
            resolveValue,
            validate: function () {
                const valid =
                    typeof this.customer === this.type ||
                    typeof +this.customer === this.type;
                const fail = 'Port must be a number.';
                return valid ? null : fail;
            }
        },
        domain: {
            default: configTemplate.domain,
            path: ['domain'],
            type: 'string',
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = 'Domain must be a string.';
                return valid ? null : fail;
            }
        },
        protocol: {
            default: configTemplate.protocol,
            path: ['protocol'],
            allowed: ['http', 'https'],
            resolveValue,
            validate: function () {
                const valid = this.allowed.includes(this.customer);
                const fail =
                    'Protocol must be exactely one of strings: http, https.';
                return valid ? null : fail;
            }
        },
        certification_autogen: {
            default: configTemplate.certification.autogen,
            path: ['certification', 'autogen'],
            type: 'boolean',
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail =
                    'Field "auto" of "certification" must be of boolean type.';
                return valid ? null : fail;
            }
        },
        certification_key: {
            default: configTemplate.certification.key,
            path: ['certification', 'key'],
            type: Buffer,
            resolveValue,
            validate: function () {
                const valid =
                    this.customer instanceof this.type ||
                    this.customer === this.default ||
                    this.customer === undefined;
                const fail =
                    "Certification key must be a buffer, string 'disabled', or undefined (this falls back to default).";
                return valid ? null : fail;
            }
        },
        certification_cert: {
            default: configTemplate.certification.cert,
            path: ['certification', 'cert'],
            type: Buffer,
            resolveValue,
            validate: function () {
                const valid =
                    this.customer instanceof this.type ||
                    this.customer === this.default ||
                    this.customer === undefined;
                const fail =
                    "Certification cert must be a buffer, string 'disabled', or undefined (this falls back to default).";
                return valid ? null : fail;
            }
        },
        serv_staticFolders: {
            default: configTemplate.serv.staticFolders,
            path: ['serv', 'staticFolders'],
            resolveValue,
            validate: function () {
                const valid = this.customer && this.customer.map;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach((element) => {
                        if (!element.map) {
                            childrenValid = false;
                        } else {
                            if (element.length !== 2) {
                                childrenValid = false;
                            }
                            element.forEach((item) => {
                                if (typeof item !== 'string') {
                                    childrenValid = false;
                                }
                            });
                        }
                    });
                }
                const fail =
                    'Serv.staticFolders field must be an array of arrays of strings.';
                return valid && childrenValid ? null : fail;
            }
        },
        serv_staticFiles: {
            default: configTemplate.serv.staticFiles,
            path: ['serv', 'staticFiles'],
            resolveValue,
            validate: function () {
                const valid = this.customer && this.customer.map;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach((element) => {
                        if (!element.map) {
                            childrenValid = false;
                        } else {
                            if (element.length !== 2) {
                                childrenValid = false;
                            }
                            element.forEach((item) => {
                                if (typeof item !== 'string') {
                                    childrenValid = false;
                                }
                            });
                        }
                    });
                }
                const fail =
                    'Serv.staticFiles field must be an array of arrays of strings.';
                return valid && childrenValid ? null : fail;
            }
        },
        serv_fallback: {
            default: configTemplate.serv.fallback,
            path: ['serv', 'fallback'],
            type: 'object',
            resolveValue,
            validate: function () {
                const valid =
                    this.customer &&
                    this.customer.map &&
                    this.customer.length === 2;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach((element) => {
                        if (typeof element !== 'string') {
                            childrenValid = false;
                        }
                    });
                }
                const fail =
                    'Serv.fallback field must be an array of two strings.';
                return valid && childrenValid ? null : fail;
            }
        },
        serv_router: {
            default: configTemplate.serv.router,
            type: 'string',
            path: ['serv', 'router'],
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = 'Serv.router field must be of string type.';
                return valid ? null : fail;
            }
        },
        middlewares: {
            default: configTemplate.middlewares,
            type: 'object',
            path: ['middlewares'],
            resolveValue,
            validate: function () {
                const valid =
                    typeof this.customer === this.type && this.customer.map;
                const fail = 'Middlewares field must be an array.';
                return valid ? null : fail;
            }
        }
    };
};

export default mapCustomerValues;
