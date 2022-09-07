const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const config = require ('./key')
const options = {}

options.secretOrKey = config.secret ; 
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwtPayload, callback) => {
            User.findById(jwtPayload.id).then(user => {
                if (user) {
                    return callback(null, user);
                } else { 
                    return callback(null, false);
                }
            })
        })
    )
};