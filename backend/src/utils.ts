import { RollResult, Char } from './types';

export function generateChar(): Char {
  const chars: Char[] = ['C', 'L', 'O', 'W'];
  const charsLength = chars.length;

  return chars[Math.floor(Math.random() * charsLength)];
}

export function makeRoll(): RollResult {
  return [generateChar(), generateChar(), generateChar()] as RollResult;
}

export function checkForWin(result: RollResult): boolean {
  // All chars are the same
  const firstChar = result[0];
  return result.every((char) => char === firstChar);
}

export function calculateBalance(result: RollResult): number {
  const map = new Map<Char, number>([
    ['C', 10],
    ['L', 20],
    ['O', 30],
    ['W', 40],
  ]);

  const firstChar = result[0];
  const isWin = checkForWin(result);

  if (isWin) {
    return map.get(firstChar) as number;
  }

  return -1;
}

export function chance(percentage: number): boolean {
  const value = Math.floor(Math.random() * 100 + 1);

  return value <= percentage;
}
