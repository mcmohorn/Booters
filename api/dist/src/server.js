"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routers/users"));
const jumps_1 = __importDefault(require("./routers/jumps"));
const jumpSecure_1 = __importDefault(require("./routers/jumpSecure"));
const areas_1 = __importDefault(require("./routers/areas"));
const express_session_1 = __importDefault(require("express-session"));
const auth_1 = __importDefault(require("./middleware/auth"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("./db/knexfile"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app
                    .listen(port, () => {
                    resolve(port);
                })
                    .on("error", (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        // standard express app configuration
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: "1mb" })); // 100kb default
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: true,
            secret: process.env.BOOTERS_SESSION_SECRET,
        }));
        // enable cors requests
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", process.env.BOOTERS_WEB_URL);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.app.options;
    }
    dbConnect() {
        // initialize databse connection via knex
        const knexConnection = (0, knex_1.default)(knexfile_1.default[process.env.NODE_ENV]);
        // attach objection to the knex connection
        objection_1.Model.knex(knexConnection);
    }
    routerConfig() {
        // enable cors for preflight requests
        this.app.options("*", (0, cors_1.default)({
            origin: process.env.BOOTERS_WEB_URL,
        }));
        // private routes
        this.app.use("/user", auth_1.default, users_1.default);
        this.app.use("/jump", auth_1.default, jumpSecure_1.default);
        // public routes
        this.app.use("/jumps", jumps_1.default);
        this.app.use("/areas", areas_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map