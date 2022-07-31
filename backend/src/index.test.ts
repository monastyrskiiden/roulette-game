import { calculateBalance, checkForWin, generateChar, makeRoll } from './utils';

describe('Generate a character', () => {
  let char = '';

  beforeEach(() => {
    char = generateChar();
  });

  it('should return 1 character', () => {
    const char = generateChar();

    expect(char).toHaveLength(1);
  });

  it('should return a character from the list', () => {
    const list = ['C', 'L', 'O', 'W'];

    expect(list).toContain(char);
  });
});

describe('Make a roll', () => {
  it('should return an array of 3 characters', () => {
    expect(makeRoll()).toHaveLength(3);
  });

  it('should return only known characters', () => {
    const list = ['C', 'L', 'O', 'W'];
    const roll = makeRoll();

    for (const char of roll) {
      expect(list).toContain(char);
    }
  });
});

describe('Check for a win', () => {
  it('should return true for "CCC"', () => {
    expect(checkForWin(['C', 'C', 'C'])).toBeTruthy();
  });

  it('should return true for "LLL"', () => {
    expect(checkForWin(['L', 'L', 'L'])).toBeTruthy();
  });

  it('should return true for "OOO"', () => {
    expect(checkForWin(['O', 'O', 'O'])).toBeTruthy();
  });

  it('should return true for "WWW"', () => {
    expect(checkForWin(['W', 'W', 'W'])).toBeTruthy();
  });

  it('should return false for any other combination', () => {
    expect(checkForWin(['W', 'L', 'O'])).toBeFalsy();
  });
});

describe('Calculate balance', () => {
  it('should return 10 for "CCC"', () => {
    expect(calculateBalance(['C', 'C', 'C'])).toBe(10);
  });

  it('should return 20 for "LLL"', () => {
    expect(calculateBalance(['L', 'L', 'L'])).toBe(20);
  });

  it('should return 30 for "OOO"', () => {
    expect(calculateBalance(['O', 'O', 'O'])).toBe(30);
  });

  it('should return 40 for "WWW"', () => {
    expect(calculateBalance(['W', 'W', 'W'])).toBe(40);
  });

  it('should return -1 for any other combination', () => {
    expect(calculateBalance(['O', 'W', 'L'])).toBe(-1);
  });
});
