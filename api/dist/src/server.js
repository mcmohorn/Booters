"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routers/users"));
const jumps_1 = __importDefault(require("./routers/jumps"));
const config_1 = __importDefault(require("./db/config"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./middleware/auth"));
var GoogleStrategy = require('passport-google-oauth20').Strategy;
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)();
        this.config();
        this.passportConfig();
        this.routerConfig();
        this.dbConnect();
    }
    passportConfig() {
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        passport_1.default.use(new GoogleStrategy({
            clientID: process.env.BOOTERS_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BOOTERS_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.BOOTERS_GOOGLE_CLIENT_CALLBACK_URL
        }, function (accessToken, refreshToken, profile, cb) {
            console.log('got profile', profile);
            return cb(null, { data: false });
            /*
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
              return cb(err, user);
            });
            */
        }));
        // passport.serializeUser(function(user, cb) {
        //     cb(null, user);
        //     });
        //     passport.deserializeUser(function(obj, cb) {
        //     cb(null, obj);
        //     });
    }
    config() {
        // standard express app configuration
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '1mb' })); // 100kb default
        this.app.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: true,
            secret: process.env.BOOTERS_SESSION_SECRET
        }));
        // enable cors requests
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    dbConnect() {
        config_1.default.connect(function (err, client, done) {
            if (err)
                throw new Error(err);
            console.log('Connected');
        });
    }
    routerConfig() {
        // private api via passport
        this.app.use('/user', auth_1.default, users_1.default);
        // public api
        this.app.use('/jumps', jumps_1.default); // this is a public api
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map