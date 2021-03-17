const helpers = require('../utils/functions');
const LogModel = require('../models/Log');

exports.getLogs = async (req, res, next) => {
    const Log = new LogModel(req.db);

    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const perPage = 10;

    try {
        let results = helpers.pagination(Log.getAll(), currentPage, perPage);

        res.status(200).json(results)

        return;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
        return err;
    }
};
