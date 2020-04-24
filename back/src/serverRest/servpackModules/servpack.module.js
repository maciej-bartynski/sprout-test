import log from '../../util/logger';

function ServerPackModule() { }

ServerPackModule.prototype.super = function (name) {
    this.__name__ = name;
};

ServerPackModule.prototype.binder = function (self) {
    for (const key in self) {
        if (typeof self[key] === 'function') {
            self[key] = self[key].bind(self);
        }
    }
};

ServerPackModule.prototype.logger = function (info, stat = 'msg') {
    const message = `${this.__name__ || '(ANONYMOUS)'}. ${info}`;
    if (stat === 'warn') log.warn(message);
    if (stat === 'fail') log.fail(message);
    if (stat === 'ok') log.ok(message);
    if (stat === 'info') log.info(message);
    if (stat === 'strong') log.strong(message);
};

ServerPackModule.prototype.__logSection = function (end = false) {
    const sectionMessage = [this.__name__, 'start'];
    if (!end) log.section(...sectionMessage);
    if (end) log.endsec(...sectionMessage)
} 

ServerPackModule.prototype.__logEnd = function () {
    const sectionMessage = [this.__name__, 'start'];
    log.endsec(...sectionMessage);
} 

ServerPackModule.prototype.create = async function (context) {
    this.__logSection();
    this.context = context;
    await this.__createModule();
    this.__logSection(true);
};

export default ServerPackModule;
