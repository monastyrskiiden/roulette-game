export type Char = 'C' | 'L' | 'O' | 'W';

export type RollResult = [Char, Char, Char];

export type Balance = {
  balance: number;
};

export type RollData = {
  result: RollResult;
  balance: number;
};

export type Transaction = {
  id: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};
