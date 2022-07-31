import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import expressSession from 'express-session';
import { calculateBalance, checkForWin, chance, makeRoll } from './utils';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  expressSession({
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1h
    },
    secret: 'test secret',
    resave: false,
    saveUninitialized: false,
  })
);

const validateBalance = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { balance = 0 } = req.session;

  if (balance <= 0) {
    req.session.destroy(() => {
      res.status(400).json({ message: 'Insufficient funds. Start a new game' });
    });
    return;
  }

  next();
};

app.post('/start', (req, res, next) => {
  // Create a new session
  req.session.regenerate((err) => {
    if (err) next(err);

    // store user balance
    req.session.balance = 10;

    // save the session
    req.session.save((err) => {
      if (err) return next(err);
      res.json({ balance: req.session.balance });
    });
  });
});

app.post(`/roll`, validateBalance, (req, res) => {
  // Get balance
  let { balance = 0 } = req.session;

  // Initiate a new roll
  let roll = makeRoll();

  let isReroll = false;
  const isWin = checkForWin(roll);

  // 30% chance to re-roll
  if (isWin && balance >= 40 && balance <= 60) {
    isReroll = chance(30);
  }

  // 60% chance to re-roll
  if (isWin && balance > 60) {
    isReroll = chance(60);
  }

  // Make a second roll
  if (isReroll) {
    roll = makeRoll();
  }

  // Calculate new balance
  balance += calculateBalance(roll);

  // Update balance
  req.session.balance = balance;

  res.status(200).json({ result: roll, balance });
});

app.post(`/cashout`, validateBalance, async (req, res) => {
  // Get balance
  const { balance } = req.session;
  // Save balance to a new account
  const result = await prisma.account.create({
    data: { balance },
  });
  // Close current session
  req.session.destroy(() => {
    // Send the response
    res.json(result);
  });
});

app.get(`/balance`, async (req, res) => {
  const { balance = 0 } = req.session;
  return res.json({ balance: balance });
});

export default app;
