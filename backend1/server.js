import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app); // Create the HTTP server instance

app.use(cors());
app.options('*', cors());

// For logging, uses morgan when not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server (httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 1337;
// const port = 1337;

app.get('/', (req, res) => {
  res.json({
    data: 'This is the API for the course vteam-2023, by students jobf22, dadh22, mejo22 and glpa22.'
  });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// For 404-errors when accessing a route that doesn't exist
app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }

  res.status(err.status || 500).json({
      "errors": [
          {
              "status": err.status,
              "title":  err.message,
              "detail": err.message
          }
      ]
  });
});

export default httpServer;
