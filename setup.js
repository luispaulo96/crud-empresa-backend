require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./app/routes/auth');
const costCenterRouter = require('./app/routes/cost-center');
const departmentsRouter = require('./app/routes/departments');
const rolesRouter = require('./app/routes/roles');
const usersRouter = require('./app/routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: '*',
}));

app.use('/auth', authRouter);
app.use('/cost-center', costCenterRouter);
app.use('/departments', departmentsRouter);
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

app.use((req, res) => {
  res.status(500).json({
    message: 'Something went wrong on server',
  });
});

module.exports = app;
