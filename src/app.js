import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { sequelize } from './db.js';

import routes from './routes/index.js';

import'./db.js';

export const server = express();

/* server.name = 'API'; */

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', {
      path: req.path,
      method: req.method,
      error: err.stack
    });
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

export const initializeServer = async () => {
  try {
    await sequelize.authenticate();
    return server;
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default server;
