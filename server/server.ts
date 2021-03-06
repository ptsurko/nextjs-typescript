
// const express, { Request, Response } = require('express');
import { Request, Response } from 'express';
import * as express from 'express';

const next = require('next');
const port = parseInt(process.env.PORT || '', 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/api/v1', (_, res: Response) => {
      return res.status(200).json({ version: 1 });
    });

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err: Error) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
});