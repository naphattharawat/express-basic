/// <reference path="../typings.d.ts"/>

var express = require('express');
import { NextFunction, Request, Response } from "express";
import MySqlConnectionConfig  from 'knex';
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var titlesRouter = require('./routes/titles');
var loginRouter = require('./routes/login');


var bodyParser = require('body-parser');
// import Knex = require('knex');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


const connection: any = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  // debug: true
};

const db = require('knex')({
  client: 'mysql',
  connection: connection,
  pool: {
    min: 0,
    max: 500,
    afterCreate: (conn: any, done: any) => {
      conn.query('SET NAMES utf8', (err: any) => {
        done(err, conn);
      });
    }
  },
});


app.use(function (req: Request, res: Response, next: NextFunction) {
  req.db = db;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/titles', titlesRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// module.exports = app;
export default app;
