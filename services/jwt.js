let jwt = require('jsonwebtoken');
const CONFIG = require('./../config/config');
let passport = require("passport");
let passportJWT = require("passport-jwt");
let JwtStrategy = passportJWT.Strategy,
    ExtractJwt = passportJWT.ExtractJwt;
const tokenList = {}

let createToken = (req, res, next) => {
    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = CONFIG['SECERT'];
    jwtOptions.RefreshSecert = CONFIG['REFRESHSECERT'];
    jwtOptions.issuer = CONFIG['ISSUER'];
    jwtOptions.expiresIn = CONFIG['JWTEXPIREIN'];
    jwtOptions.refreshTokenLife = CONFIG['REFRESHTOKENEXPIREIN'];
    var strategy = new JwtStrategy(jwtOptions, function(req, next) {
        user = req.session['emailId'];
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

    passport.use(strategy);
    // console.log(strategy, "strategy");
    var refreshVal = String(Math.floor(Date.now() / 1000) - 30);
    var token = jwt.sign({
            emailId: req.session['emailId']
        },
        jwtOptions.secretOrKey, {
            expiresIn: CONFIG['JWTEXPIREIN']
        }
    );
    var refreshToken = jwt.sign({
            "refreshId": refreshVal
        },
        jwtOptions.RefreshSecert, {
            expiresIn: CONFIG['REFRESHEXPIREIN']
        }
    );
    // console.log("refresh", refreshToken);
    req.session['sessionJWT'] = "JWT " + token;
    // req.session['sessionRefreshJWT'] = refreshToken;
    tokenList[refreshToken] = { "Token": token };
    return {
        "Token": req.session['sessionJWT'],
        "refreshToken": refreshToken,
        "status": true
    };
}

let checkValid = (req, res, next) => {
    // console.log("nodeHeader", req['headers']['authorization']);
    var bearerHeader = req.headers['authorization'];
    var token;
    // console.log(bearerHeader, "bearerHeader");
    req.authenticated = false;
    var refreshToken = req.body['refreshToken'];
    // console.log(refreshToken, "Init");
    var response = {};
    if (bearerHeader) {
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        jwt.verify(token, CONFIG['SECERT'], function(err, decoded) {
            if (err) {
                req.decoded = null;
                jwt.verify(refreshToken, CONFIG['REFRESHSECERT'], function(refreshErr, refreshDecodeData) {
                    if (refreshErr) {
                        response = {
                            "status": req.authenticated,
                            "JWTResponse": "Refresh token expired",
                            "JWTExpiredAt": refreshErr.expiredAt,
                            "action": req.body['action']
                        };
                    } else {
                        req.refreshDecode = refreshDecodeData;
                        if ((refreshToken != undefined) && (refreshToken in tokenList)) {
                            var newToken = jwt.sign({
                                    emailId: req.session['emailId']
                                },
                                CONFIG['SECERT'], {
                                    expiresIn: CONFIG['JWTEXPIREIN']
                                }
                            );
                            tokenList[refreshToken] = { "Token": newToken };
                            req.authenticated = true;
                            response = {
                                "status": req.authenticated,
                                "JWTResponse": "New token generated next " + CONFIG['JWTEXPIREIN'],
                                "Token": "JWT " + newToken,
                                "refreshToken": refreshToken,
                                "action": req.body['action']
                            };
                        } else {
                            response = {
                                "status": req.authenticated,
                                "JWTResponse": "Refresh token invalid or already used",
                                "action": req.body['action']
                            };
                        }
                    }
                });
            } else {
                req.decoded = decoded;
                // console.log("----------", decoded['emailId'] + "<--->" + req.body['userName']);
                if (decoded['emailId'] == req.body['userName']) {
                    if ((refreshToken != '') && (refreshToken in tokenList)) {
                        req.authenticated = true;
                        var refreshVal = String(Math.floor(Date.now() / 1000) - 30);
                        var newRefreshToken = jwt.sign({
                                "refreshId": refreshVal
                            },
                            CONFIG['REFRESHSECERT'], {
                                expiresIn: CONFIG['REFRESHEXPIREIN']
                            });
                        tokenList[newRefreshToken] = { "Token": token };
                        response = {
                            "status": req.authenticated,
                            "refreshToken": newRefreshToken,
                            "action": req.body['action']
                        };
                        delete tokenList[refreshToken];
                    } else {
                        response = {
                            "status": req.authenticated,
                            "JWTResponse": "Refresh token invalid or already used",
                            "action": req.body['action']
                        };
                    }
                } else {
                    response = {
                        "status": req.authenticated,
                        "JWTResponse": "Invalid UserName with JWT Token",
                        "action": req.body['action']
                    };
                }
            }
        });
    } else {
        response = { "status": req.authenticated, "JWTResponse": "JWT token not present in header" };
    }
    req.session['sessionStatus'] = req.authenticated;
    return response;
}

module.exports = {
    createToken: createToken,
    checkValid: checkValid
}