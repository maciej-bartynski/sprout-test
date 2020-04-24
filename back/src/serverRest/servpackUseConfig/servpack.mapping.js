

import configTemplate from './servpack.template';

const mapCustomerValues = (config) => {

    const resolveValue = function () {
        try {
            let givenConfig = { ...config };
            this.path.forEach(key => {
                givenConfig = givenConfig[key];
            })
            this.customer = givenConfig;
        } catch {
            this.customer = this.customer === 'disabled'
                ? undefined
                : this.default;
        }
    }

    return ({
        port: {
            default: configTemplate.port,
            path: ["port"],
            type: "number",
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type || typeof +this.customer === this.type;
                const fail = "Port must be a number.";
                return valid ? null : fail;
            }
        },
        domain: {
            default: configTemplate.domain,
            path: ["domain"],
            type: "string",
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = "Domain must be a string.";
                return valid ? null : fail;
            }
        },
        protocol: {
            default: configTemplate.protocol,
            path: ["protocol"],
            allowed: ["http", "https"],
            resolveValue,
            validate: function () {
                const valid = this.allowed.includes(this.customer);
                const fail = "Protocol must be exactely one of strings: http, https.";
                return valid ? null : fail;
            }
        },
        certification_autogen: {
            default: configTemplate.certification.autogen,
            path: ["certification", "autogen"],
            type: "boolean",
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = "Field \"auto\" of \"certification\" must be of boolean type.";
                return valid ? null : fail;
            }
        },
        certification_key: {
            default: configTemplate.certification.key,
            path: ["certification", "key"],
            type: "string",
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = "Certification key must be a valid path to existing file.";
                return valid ? null : fail;
            }
        },
        certification_cert: {
            default: configTemplate.certification.cert,
            path: ["certification", "cert"],
            type: "string",
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = "Certification cert must be a valid path to existing file.";
                return valid ? null : fail;
            }
        },
        serv_staticFolders: {
            default: configTemplate.serv.staticFolders,
            path: ["serv", "staticFolders"],
            resolveValue,
            validate: function () {
                const valid = this.customer && this.customer.map;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach(element => {
                        if (!element.map) {
                            fail += " of arrays";
                            childrenValid = false;
                        } else {
                            if (element.length !== 2) {
                                childrenValid = false;
                            }
                            element.forEach(item => {
                                if (typeof item !== 'string') {
                                    childrenValid = false;
                                }
                            })
                        }
                    });
                }
                const fail = "Serv.staticFolders field must be an array of arrays of strings.";
                return valid && childrenValid ? null : fail;
            }
        },
        serv_staticFiles: {
            default: configTemplate.serv.staticFiles,
            path: ["serv", "staticFiles"],
            resolveValue,
            validate: function () {
                const valid = this.customer && this.customer.map;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach(element => {
                        if (!element.map) {
                            fail += " of arrays";
                            childrenValid = false;
                        } else {
                            if (element.length !== 2) {
                                childrenValid = false;
                            }
                            element.forEach(item => {
                                if (typeof item !== 'string') {
                                    childrenValid = false;
                                }
                            })
                        }
                    });
                }
                const fail = "Serv.staticFiles field must be an array of arrays of strings.";
                return valid && childrenValid ? null : fail;
            }
        },
        serv_fallback: {
            default: configTemplate.serv.fallback,
            path: ["serv", "fallback"],
            type: 'object',
            resolveValue,
            validate: function () {
                const valid = this.customer && this.customer.map && this.customer.length === 2;
                let childrenValid = true;
                if (valid) {
                    this.customer.forEach(element => {
                        if (typeof element !== 'string') {
                            childrenValid = false;
                        }
                    });
                }
                const fail = "Serv.fallback field must be an array of two strings.";
                return valid && childrenValid ? null : fail;
            }
        },
        serv_router: {
            default: configTemplate.serv.router,
            type: 'string',
            path: ["serv", "router"],
            resolveValue,
            validate: function () {
                const valid = typeof this.customer === this.type;
                const fail = "Serv.router field must be of string type.";
                return valid ? null : fail;
            }
        },
    })
};

export default mapCustomerValues;