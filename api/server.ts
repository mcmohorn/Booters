import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routers/users';
import jumpRouter from './routers/jumps';
import pool from './db/config';
import session from 'express-session';
import passport from 'passport';
import auth from './middleware/auth';

var GoogleStrategy = require('passport-google-oauth20').Strategy;

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.passportConfig();
        this.routerConfig();
        this.dbConnect();
    }

    private passportConfig() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new GoogleStrategy({
            clientID: process.env.BOOTERS_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BOOTERS_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.BOOTERS_GOOGLE_CLIENT_CALLBACK_URL
          },
          function(accessToken, refreshToken, profile, cb) {
            console.log('got profile', profile);
            
            return cb(null, {data: false});
            /*
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
              return cb(err, user);
            });
            */
          }
        ));

        // passport.serializeUser(function(user, cb) {
        //     cb(null, user);
        //     });

        //     passport.deserializeUser(function(obj, cb) {
        //     cb(null, obj);
        //     });

    }

    private config() {
        // standard express app configuration
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default

        this.app.use(session({
            resave: false,
            saveUninitialized: true,
            secret: process.env.BOOTERS_SESSION_SECRET 
          }));

          // enable cors requests
          this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
       });
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error(err);
            console.log('Connected');
          }); 
    }

    private routerConfig() {
        // private api via passport
        this.app.use('/user', auth, userRouter);
        
        // public api
        this.app.use('/jumps', jumpRouter); // this is a public api
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;