const helpers = require('../utils/functions');

class Log {

    constructor(db) {
        this.logs = helpers.deepClone(db);
    }

    getAll() {
        return this.logs;
    }
}

module.exports = Log;
