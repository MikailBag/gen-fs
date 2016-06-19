module.exports = {
    read: function (stream, cb) {
        stream.once('data', function (chunk) {
            cb(null, chunk);
        });
    }, wait: function (ee, event, cb) {
        ee.once(event, function (data) {
            cb(null, data);
        });

    }
};
