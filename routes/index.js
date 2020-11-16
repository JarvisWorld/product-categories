//routes/index.js
module.exports = {
    priority: 1000, //this is the `/` handler, should it should be the last route.
    path: '/',

    //this function gets passed the express object one time for any extra setup
    init: function(app) {
        (function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });
    },

    GET: [
        function(req, res) {
            res.send('Server worked');
        }
    ],

    POST: function(req, res) {
        res.send('Server worked');
    }
};