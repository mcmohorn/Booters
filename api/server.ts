import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/users";
import jumpRouter from "./routers/jumps";
import session from "express-session";
import auth from "./middleware/auth";
import knex from "knex";
import { Model } from "objection";
import knexConfig from "./db/knexfile"

import cors from "cors";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    // standard express app configuration
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
    this.app.use(cors());

    this.app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.BOOTERS_SESSION_SECRET,
      })
    );

    // enable cors requests
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", process.env.BOOTERS_WEB_URL);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

    this.app.options
  }

  private dbConnect() {

    // initialize databse connection via knex
    const knexConnection = knex(knexConfig[process.env.NODE_ENV]);

    // attach objection to the knex connection
    Model.knex(knexConnection);

  }

  private routerConfig() {

    // enable cors for preflight requests
    this.app.options("*", cors({
        origin: process.env.BOOTERS_WEB_URL
    })); 


    // private routes
    this.app.use("/user", auth, userRouter);

    // public routes
    this.app.use("/jumps", jumpRouter);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
