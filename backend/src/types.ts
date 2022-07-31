import session from 'express-session';
export type Char = 'C' | 'L' | 'O' | 'W';

export type RollResult = [Char, Char, Char];

declare module 'express-session' {
  export interface SessionData {
    balance: number;
  }
}
